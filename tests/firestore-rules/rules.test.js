// Testes das regras do Firestore (../../firestore.rules) no Emulator local.
// Rodar: npm test (nesta pasta). Usa o projeto fictício demo-stratum — nunca toca produção.
import { test, before, after, beforeEach } from 'node:test';
import fs from 'node:fs';
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const MASTER = 'kauue.neves@gmail.com';
let env;

before(async () => {
  env = await initializeTestEnvironment({
    projectId: 'demo-stratum',
    // RULES_FILE permite testar outra versão das regras (ex.: a publicada hoje)
    firestore: { rules: fs.readFileSync(process.env.RULES_FILE || new URL('../../firestore.rules', import.meta.url), 'utf8'), host: '127.0.0.1', port: 8085 }
  });
});
after(async () => { await env.cleanup(); });
beforeEach(async () => { await env.clearFirestore(); });

const now = '2026-10-23T00:00:00.000Z';
// Perfil como o site (index.html → createUserDoc) cria
const docSite = (email, role = 'user') => ({
  email, name: 'Fulano', role, plan: 'acess', status: 'active', subscription: 'trial',
  subscriptionStart: now, subscriptionEnd: now, createdAt: now, updatedAt: now
});
// Perfil como o simulador (boitel-analytics-pro → createUserDocument) cria: sem plan/name
const docSimulador = (email) => ({
  email, role: 'user', status: 'active', subscription: 'trial',
  subscriptionStart: now, subscriptionEnd: now, createdAt: now, updatedAt: now
});
const user = (uid, email, verified = true) => env.authenticatedContext(uid, { email, email_verified: verified }).firestore();
const seed = (path, data) => env.withSecurityRulesDisabled(c => setDoc(doc(c.firestore(), path), data));

// ---------------- criação de perfil ----------------
test('cria perfil como o site', async () => {
  await assertSucceeds(setDoc(doc(user('u1', 'a@x.com'), 'users/u1'), docSite('a@x.com')));
});
test('cria perfil como o simulador (sem plan/name)', async () => {
  await assertSucceeds(setDoc(doc(user('u1', 'a@x.com'), 'users/u1'), docSimulador('a@x.com')));
});
test('nega criar perfil de outro uid', async () => {
  await assertFails(setDoc(doc(user('u1', 'a@x.com'), 'users/u2'), docSite('a@x.com')));
});
test('nega criar perfil com e-mail diferente do login', async () => {
  await assertFails(setDoc(doc(user('u1', 'a@x.com'), 'users/u1'), docSite(MASTER)));
});
test('nega usuário comum nascer admin ou dev', async () => {
  await assertFails(setDoc(doc(user('u1', 'a@x.com'), 'users/u1'), docSite('a@x.com', 'admin')));
  await assertFails(setDoc(doc(user('u1', 'a@x.com'), 'users/u1'), docSite('a@x.com', 'dev')));
});
test('nega criar com campos extras (master, cenarios…)', async () => {
  await assertFails(setDoc(doc(user('u1', 'a@x.com'), 'users/u1'), { ...docSite('a@x.com'), master: true }));
});
test('nega nascer premium, pro ou com status diferente', async () => {
  await assertFails(setDoc(doc(user('u1', 'a@x.com'), 'users/u1'), { ...docSite('a@x.com'), subscription: 'premium' }));
  await assertFails(setDoc(doc(user('u1', 'a@x.com'), 'users/u1'), { ...docSite('a@x.com'), plan: 'pro' }));
  await assertFails(setDoc(doc(user('u1', 'a@x.com'), 'users/u1'), { ...docSite('a@x.com'), status: 'blocked' }));
});
test('nega nome gigante na criação', async () => {
  await assertFails(setDoc(doc(user('u1', 'a@x.com'), 'users/u1'), { ...docSite('a@x.com'), name: 'x'.repeat(81) }));
});
test('master verificado nasce admin', async () => {
  await assertSucceeds(setDoc(doc(user('m', MASTER, true), 'users/m'), docSite(MASTER, 'admin')));
});
test('e-mail do master NÃO verificado não nasce admin', async () => {
  await assertFails(setDoc(doc(user('m', MASTER, false), 'users/m'), docSite(MASTER, 'admin')));
  await assertSucceeds(setDoc(doc(user('m', MASTER, false), 'users/m'), docSite(MASTER, 'user')));
});
test('visitante sem login não cria perfil', async () => {
  await assertFails(setDoc(doc(env.unauthenticatedContext().firestore(), 'users/u1'), docSite('a@x.com')));
});

// ---------------- edição do próprio perfil ----------------
test('dono edita name, phone, bio, cenarios e updatedAt', async () => {
  await seed('users/u1', docSite('a@x.com'));
  await assertSucceeds(updateDoc(doc(user('u1', 'a@x.com'), 'users/u1'),
    { name: 'Novo', phone: '(11) 99999-0000', bio: 'Pecuarista', cenarios: [{ nome: 'A' }], updatedAt: now }));
});
for (const [campo, valor] of [
  ['email', '<img src=x onerror=alert(1)>'], ['email', MASTER], ['role', 'admin'], ['role', 'dev'],
  ['plan', 'pro'], ['subscription', 'premium'], ['subscriptionEnd', '2099-01-01T00:00:00.000Z'],
  ['status', 'active2'], ['master', true]
]) {
  test(`nega dono alterar ${campo}=${JSON.stringify(valor).slice(0, 30)}`, async () => {
    await seed('users/u1', docSite('a@x.com'));
    await assertFails(updateDoc(doc(user('u1', 'a@x.com'), 'users/u1'), { [campo]: valor }));
  });
}
test('nega valores grandes demais no perfil', async () => {
  await seed('users/u1', docSite('a@x.com'));
  const db = user('u1', 'a@x.com');
  await assertFails(updateDoc(doc(db, 'users/u1'), { name: 'x'.repeat(81) }));
  await assertFails(updateDoc(doc(db, 'users/u1'), { phone: '1'.repeat(31) }));
  await assertFails(updateDoc(doc(db, 'users/u1'), { bio: 'x'.repeat(501) }));
  await assertFails(updateDoc(doc(db, 'users/u1'), { cenarios: Array.from({ length: 51 }, (_, i) => i) }));
  await assertFails(updateDoc(doc(db, 'users/u1'), { name: 123 }));
});
test('nega editar perfil de outra pessoa', async () => {
  await seed('users/u2', docSite('b@x.com'));
  await assertFails(updateDoc(doc(user('u1', 'a@x.com'), 'users/u2'), { name: 'hack' }));
});
test('nega dono apagar o próprio perfil', async () => {
  await seed('users/u1', docSite('a@x.com'));
  await assertFails(deleteDoc(doc(user('u1', 'a@x.com'), 'users/u1')));
});

// ---------------- leitura ----------------
test('dono lê o próprio perfil; não lê o de outra pessoa', async () => {
  await seed('users/u1', docSite('a@x.com'));
  await seed('users/u2', docSite('b@x.com'));
  await assertSucceeds(getDoc(doc(user('u1', 'a@x.com'), 'users/u1')));
  await assertFails(getDoc(doc(user('u1', 'a@x.com'), 'users/u2')));
});

// ---------------- admin ----------------
test('admin (por cargo) lê e altera qualquer usuário', async () => {
  await seed('users/adm', docSite('adm@x.com', 'admin'));
  await seed('users/u1', docSite('a@x.com'));
  const db = user('adm', 'adm@x.com');
  await assertSucceeds(getDoc(doc(db, 'users/u1')));
  await assertSucceeds(updateDoc(doc(db, 'users/u1'), { plan: 'pro', subscription: 'premium', role: 'dev' }));
});
test('master verificado é admin mesmo sem documento', async () => {
  await seed('users/u1', docSite('a@x.com'));
  await assertSucceeds(updateDoc(doc(user('m', MASTER, true), 'users/u1'), { plan: 'pro' }));
});
test('master NÃO verificado não é admin', async () => {
  await seed('users/u1', docSite('a@x.com'));
  await assertFails(updateDoc(doc(user('m', MASTER, false), 'users/u1'), { plan: 'pro' }));
});
test('usuário com e-mail do master gravado no doc não vira admin', async () => {
  await seed('users/u9', { ...docSite('a@x.com'), email: MASTER });
  await seed('users/u1', docSite('b@x.com'));
  await assertFails(updateDoc(doc(user('u9', 'a@x.com'), 'users/u1'), { plan: 'pro' }));
});

// ---------------- config e site ----------------
test('config/ e site/: leitura pública', async () => {
  await seed('config/pagamento', { pagamentoHabilitado: true });
  await seed('site/conteudo', { css: '' });
  const anon = env.unauthenticatedContext().firestore();
  await assertSucceeds(getDoc(doc(anon, 'config/pagamento')));
  await assertSucceeds(getDoc(doc(anon, 'site/conteudo')));
});
test('config/: só admin escreve', async () => {
  await seed('users/adm', docSite('adm@x.com', 'admin'));
  await seed('users/dev', docSite('dev@x.com', 'dev'));
  await seed('users/u1', docSite('a@x.com'));
  await assertSucceeds(setDoc(doc(user('adm', 'adm@x.com'), 'config/pagamento'), { pagamentoHabilitado: false }));
  await assertFails(setDoc(doc(user('dev', 'dev@x.com'), 'config/pagamento'), { pagamentoHabilitado: false }));
  await assertFails(setDoc(doc(user('u1', 'a@x.com'), 'config/pagamento'), { pagamentoHabilitado: false }));
});
test('site/: admin e dev escrevem; usuário comum não', async () => {
  await seed('users/adm', docSite('adm@x.com', 'admin'));
  await seed('users/dev', docSite('dev@x.com', 'dev'));
  await seed('users/u1', docSite('a@x.com'));
  await assertSucceeds(setDoc(doc(user('adm', 'adm@x.com'), 'site/conteudo'), { css: 'a{}' }));
  await assertSucceeds(setDoc(doc(user('dev', 'dev@x.com'), 'site/conteudo'), { css: 'b{}' }));
  await assertFails(setDoc(doc(user('u1', 'a@x.com'), 'site/conteudo'), { js: 'alert(1)' }));
});
test('site/: só o master publica ou altera o JS personalizado (S4)', async () => {
  await seed('users/adm', docSite('adm@x.com', 'admin'));
  await seed('users/dev', docSite('dev@x.com', 'dev'));
  const dev = user('dev', 'dev@x.com'), adm = user('adm', 'adm@x.com'), master = user('m', MASTER, true);
  await assertFails(setDoc(doc(dev, 'site/conteudo'), { js: 'alert(1)' }));
  await assertFails(setDoc(doc(adm, 'site/conteudo'), { js: 'alert(1)' }));
  await assertSucceeds(setDoc(doc(master, 'site/conteudo'), { js: 'console.log(1)', css: '' }));
  // dev edita o resto com merge (como o editor faz) sem tocar no JS
  await assertSucceeds(setDoc(doc(dev, 'site/conteudo'), { css: 'b{}', htmlTop: '<b>oi</b>' }, { merge: true }));
  await assertFails(setDoc(doc(dev, 'site/conteudo'), { js: 'alert(2)' }, { merge: true }));
  await assertFails(setDoc(doc(adm, 'site/conteudo'), { css: 'c{}' }));   // sobrescrever apagaria o JS do master
  await assertFails(deleteDoc(doc(dev, 'site/conteudo')));
  await assertFails(setDoc(doc(user('m2', MASTER, false), 'site/conteudo'), { js: 'x' }, { merge: true }));
  await assertSucceeds(setDoc(doc(master, 'site/conteudo'), { js: '' }, { merge: true }));
});
test('coleções não listadas ficam bloqueadas', async () => {
  await assertFails(setDoc(doc(user('u1', 'a@x.com'), 'qualquer/coisa'), { a: 1 }));
});

// ---------------- comunidade do simulador ----------------
const post = (uid) => ({ uid, autor: 'Fulano', tipo: 'pergunta', titulo: 'Frete', texto: 'Quanto custa?', criadoEm: now, respostas: 0 });
const resp = (uid, postId = 'p1') => ({ postId, uid, autor: 'Ciclano', texto: 'Depende.', criadoEm: now });
test('comunidade: logado publica em seu nome; anônimo não lê nem publica', async () => {
  const u1 = user('u1', 'a@x.com');
  await assertSucceeds(setDoc(doc(u1, 'community_posts/p1'), post('u1')));
  await assertSucceeds(getDoc(doc(u1, 'community_posts/p1')));
  const anon = env.unauthenticatedContext().firestore();
  await assertFails(getDoc(doc(anon, 'community_posts/p1')));
  await assertFails(setDoc(doc(anon, 'community_posts/p2'), post('u1')));
  await assertFails(setDoc(doc(u1, 'community_posts/p3'), post('outro')));
  await assertFails(setDoc(doc(u1, 'community_posts/p4'), { ...post('u1'), tipo: '<img onerror=x>' }));
  await assertFails(setDoc(doc(u1, 'community_posts/p5'), { ...post('u1'), respostas: 99 }));
  await assertFails(setDoc(doc(u1, 'community_posts/p6'), { ...post('u1'), titulo: 'x'.repeat(121) }));
  await assertFails(setDoc(doc(u1, 'community_posts/p7'), { ...post('u1'), extra: 1 }));
});
test('comunidade: contador só sobe de 1 em 1; só o autor ou admin apaga', async () => {
  await seed('community_posts/p1', post('u1'));
  await seed('users/adm', docSite('adm@x.com', 'admin'));
  const u2 = user('u2', 'b@x.com');
  await assertSucceeds(updateDoc(doc(u2, 'community_posts/p1'), { respostas: 1 }));
  await assertFails(updateDoc(doc(u2, 'community_posts/p1'), { respostas: 10 }));
  await assertFails(updateDoc(doc(u2, 'community_posts/p1'), { titulo: 'trocado' }));
  await assertFails(deleteDoc(doc(u2, 'community_posts/p1')));
  await assertSucceeds(deleteDoc(doc(user('adm', 'adm@x.com'), 'community_posts/p1')));
});
test('comunidade: respostas em post existente, em seu nome', async () => {
  await seed('community_posts/p1', post('u1'));
  const u2 = user('u2', 'b@x.com');
  await assertSucceeds(setDoc(doc(u2, 'community_answers/a1'), resp('u2')));
  await assertFails(setDoc(doc(u2, 'community_answers/a2'), resp('u1')));
  await assertFails(setDoc(doc(u2, 'community_answers/a3'), resp('u2', 'naoexiste')));
  await assertFails(updateDoc(doc(u2, 'community_answers/a1'), { texto: 'editado' }));
  await assertFails(deleteDoc(doc(user('u3', 'c@x.com'), 'community_answers/a1')));
  await assertSucceeds(deleteDoc(doc(u2, 'community_answers/a1')));
});
