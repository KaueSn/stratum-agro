// ============================================
// PASTAS — "salvar para ver depois"
// ============================================
// Funciona sem login (localStorage). Com login, sincroniza no perfil do
// usuário no Firestore (users/{uid}.pastas), unindo o que havia no aparelho
// com o que estava na conta. Limites: 20 pastas, 100 itens por pasta.
// API: Pastas.lista(), Pastas.salvar(item, pastaId), Pastas.criar(nome),
//      Pastas.renomear(id, nome), Pastas.excluir(id), Pastas.remover(pastaId, itemId),
//      Pastas.onMudar(fn), Pastas.conectar(db, uid)
// item = { tipo: 'estudo'|'curso', id, titulo, url }
// ============================================

const Pastas = (() => {
  const KEY = 'stratum-pastas-v1';
  const MAX_PASTAS = 20, MAX_ITENS = 100;
  let pastas = ler();
  let ouvintes = [];
  let remoto = null;   // { db, uid }

  function padrao() { return [{ id: 'ler-depois', nome: 'Ler depois', itens: [] }]; }
  function ler() {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (Array.isArray(v) && v.length) return limpar(v);
    } catch (e) {}
    return padrao();
  }
  // Normaliza dados vindos do aparelho ou do Firestore (nunca confia no formato)
  function limpar(v) {
    const out = [];
    (Array.isArray(v) ? v : []).slice(0, MAX_PASTAS).forEach(p => {
      if (!p || typeof p.id !== 'string' || typeof p.nome !== 'string') return;
      const itens = (Array.isArray(p.itens) ? p.itens : []).filter(i => i && typeof i.id === 'string' && typeof i.titulo === 'string')
        .slice(0, MAX_ITENS).map(i => ({ tipo: i.tipo === 'curso' ? 'curso' : 'estudo', id: i.id.slice(0, 80), titulo: i.titulo.slice(0, 160), url: typeof i.url === 'string' ? i.url.slice(0, 300) : '', salvoEm: typeof i.salvoEm === 'string' ? i.salvoEm : '' }));
      out.push({ id: p.id.slice(0, 40), nome: p.nome.slice(0, 40), itens });
    });
    return out.length ? out : padrao();
  }
  function gravar() {
    try { localStorage.setItem(KEY, JSON.stringify(pastas)); } catch (e) {}
    ouvintes.forEach(fn => { try { fn(pastas); } catch (e) {} });
    if (remoto) {
      remoto.db.collection('users').doc(remoto.uid).update({ pastas, updatedAt: new Date().toISOString() })
        .catch(e => console.warn('Pastas: não foi possível sincronizar', e && e.code));
    }
  }
  function novoId() { return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  function unir(a, b) {
    const mapa = {};
    limpar(a).concat(limpar(b)).forEach(p => {
      if (!mapa[p.id]) mapa[p.id] = { id: p.id, nome: p.nome, itens: [] };
      p.itens.forEach(i => { if (!mapa[p.id].itens.some(x => x.id === i.id)) mapa[p.id].itens.push(i); });
    });
    return limpar(Object.values(mapa));
  }

  return {
    lista: () => pastas,
    onMudar(fn) { ouvintes.push(fn); },
    contem(itemId) { return pastas.some(p => p.itens.some(i => i.id === itemId)); },
    criar(nome) {
      nome = String(nome || '').trim().slice(0, 40);
      if (!nome) return null;
      if (pastas.length >= MAX_PASTAS) throw new Error('Limite de ' + MAX_PASTAS + ' pastas.');
      const p = { id: novoId(), nome, itens: [] };
      pastas.push(p); gravar(); return p;
    },
    renomear(id, nome) {
      const p = pastas.find(x => x.id === id); nome = String(nome || '').trim().slice(0, 40);
      if (p && nome) { p.nome = nome; gravar(); }
    },
    excluir(id) {
      pastas = pastas.filter(p => p.id !== id);
      if (!pastas.length) pastas = padrao();
      gravar();
    },
    salvar(item, pastaId) {
      const p = pastas.find(x => x.id === pastaId) || pastas[0];
      if (p.itens.some(i => i.id === item.id)) return p;
      if (p.itens.length >= MAX_ITENS) throw new Error('Esta pasta já tem ' + MAX_ITENS + ' itens.');
      p.itens.unshift({ tipo: item.tipo, id: item.id, titulo: item.titulo, url: item.url || '', salvoEm: new Date().toISOString() });
      gravar(); return p;
    },
    remover(pastaId, itemId) {
      const p = pastas.find(x => x.id === pastaId);
      if (p) { p.itens = p.itens.filter(i => i.id !== itemId); gravar(); }
    },
    // Liga a sincronização com a conta. Une o que está no aparelho com o salvo na conta.
    async conectar(db, uid) {
      if (!db || !uid) { remoto = null; return; }
      try {
        const snap = await db.collection('users').doc(uid).get();
        const daConta = snap.exists && Array.isArray(snap.data().pastas) ? snap.data().pastas : [];
        pastas = unir(daConta, pastas);
        remoto = { db, uid };
        gravar();
      } catch (e) { console.warn('Pastas: sem sincronização', e && e.code); remoto = null; }
    },
    desconectar() { remoto = null; }
  };
})();
