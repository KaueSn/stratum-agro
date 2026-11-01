// Regras de users/{uid}/projetos da Plataforma Patrimonial (boitel-analytics-pro/plataforma).
// Testa ../../firestore.rules; se o bloco ainda não estiver lá, junta com plataforma/config/firestore-projetos.rules.
// Rodar: npm test (roda este arquivo e rules.test.js)
import { test, before, after, beforeEach } from 'node:test';
import fs from 'node:fs';
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const ANCORA = 'allow delete: if isAdmin() || (signedIn() && request.auth.uid == uid);';
let env;
before(async () => {
  const base = fs.readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8');
  // Se o bloco já está no arquivo, testa o arquivo como está. Senão, junta em memória com a
  // cópia da plataforma (função de substituição: evita que "$'" da regex vire padrão especial).
  let regras = process.env.RULES_FILE ? fs.readFileSync(process.env.RULES_FILE, 'utf8') : base;
  if (!regras.includes('match /projetos/{pid}')) {
    if (!base.includes(ANCORA)) throw new Error('Âncora não encontrada em firestore.rules');
    const bloco = fs.readFileSync(new URL('../../../plataforma/config/firestore-projetos.rules', import.meta.url), 'utf8');
    regras = base.replace(ANCORA, () => ANCORA + '\n\n' + bloco);
  }
  env = await initializeTestEnvironment({ projectId: 'demo-stratum', firestore: { rules: regras, host: '127.0.0.1', port: 8085 } });
});
after(async () => { await env.cleanup(); });
beforeEach(async () => { await env.clearFirestore(); });

const t = '2026-10-28T00:00:00.000Z';
const perfil = (o = {}) => ({ email: 'a@x.com', role: 'user', plan: 'pro', status: 'active', subscription: 'premium', ...o });
const proj = (o = {}) => ({ formato: 1, nome: 'Plano', estado: { versao: 1, nome: 'Plano', lote: { gmdKg: 1.6 }, filtros: { regiao: 'MG' } }, resumo: null, versoes: [], criadoEm: t, atualizadoEm: t, ...o });
const user = uid => env.authenticatedContext(uid, { email: uid + '@x.com', email_verified: true }).firestore();
const seed = (p, d) => env.withSecurityRulesDisabled(c => setDoc(doc(c.firestore(), p), d));

test('dono Pro cria, lê, altera e exclui', async () => {
  await seed('users/u1', perfil());
  const db = user('u1');
  await assertSucceeds(setDoc(doc(db, 'users/u1/projetos/p00'), proj()));
  await assertSucceeds(getDoc(doc(db, 'users/u1/projetos/p00')));
  await assertSucceeds(updateDoc(doc(db, 'users/u1/projetos/p00'), { nome: 'Novo', atualizadoEm: t }));
  await assertSucceeds(deleteDoc(doc(db, 'users/u1/projetos/p00')));
});
test('sem Pro, inativo ou expirado não cria', async () => {
  for (const o of [{ plan: 'acess' }, { status: 'inactive' }, { subscription: 'expired' }]) {
    await seed('users/u1', perfil(o));
    await assertFails(setDoc(doc(user('u1'), 'users/u1/projetos/p01'), proj()));
  }
});
test('ex-Pro ainda lê e exclui os próprios dados', async () => {
  await seed('users/u1', perfil({ plan: 'acess' }));
  await seed('users/u1/projetos/p00', proj());
  await assertSucceeds(getDoc(doc(user('u1'), 'users/u1/projetos/p00')));
  await assertSucceeds(deleteDoc(doc(user('u1'), 'users/u1/projetos/p00')));
});
test('outro usuário e admin não leem nem escrevem', async () => {
  await seed('users/u1', perfil());
  await seed('users/u2', perfil());
  await seed('users/adm', perfil({ role: 'admin' }));
  await seed('users/u1/projetos/p00', proj());
  for (const u of ['u2', 'adm']) {
    await assertFails(getDoc(doc(user(u), 'users/u1/projetos/p00')));
    await assertFails(setDoc(doc(user(u), 'users/u1/projetos/p01'), proj()));
  }
  await assertFails(getDoc(doc(env.unauthenticatedContext().firestore(), 'users/u1/projetos/p00')));
});
test('limite de 50 ids e esquema fechado', async () => {
  await seed('users/u1', perfil());
  const db = user('u1');
  for (const id of ['p50', 'x01', 'p0']) await assertFails(setDoc(doc(db, 'users/u1/projetos/' + id), proj()));
  await assertSucceeds(setDoc(doc(db, 'users/u1/projetos/p49'), proj()));
  await assertFails(setDoc(doc(db, 'users/u1/projetos/p02'), proj({ extra: 1 })));
  await assertFails(setDoc(doc(db, 'users/u1/projetos/p03'), proj({ nome: 'x'.repeat(121) })));
  await assertFails(setDoc(doc(db, 'users/u1/projetos/p04'), proj({ versoes: Array(11).fill({}) })));
  await assertFails(setDoc(doc(db, 'users/u1/projetos/p05'), proj({ estado: { script: 'x' } })));
  await assertFails(setDoc(doc(db, 'users/u1/projetos/p06'), proj({ formato: 2 })));
});
test('não altera a data de criação', async () => {
  await seed('users/u1', perfil());
  await seed('users/u1/projetos/p00', proj());
  await assertFails(updateDoc(doc(user('u1'), 'users/u1/projetos/p00'), { criadoEm: '2020-01-01' }));
});
