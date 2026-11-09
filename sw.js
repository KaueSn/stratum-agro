// Modo campo: guarda "Minha fazenda" para abrir sem internet.
// Escopo limitado a /campo* (registrado em js/campo-app.js): o resto do site
// não passa por aqui. Com internet busca a versão nova (HTML e JS sempre da
// mesma publicação); se a rede falhar ou demorar, usa o que está guardado.
const CACHE = 'stratum-campo-v2';
const ESPERA_REDE_MS = 3000;
const ARQUIVOS = [
  'campo.html', 'favicon.svg', 'manifest-campo.webmanifest', 'css/base.css', 'css/campo.css', 'img/hero-boiada.webp', 'img/icon-192.png',
  'js/lgpd.js', 'js/campo-calc.js', 'js/campo-dados.js', 'js/campo-ui.js', 'js/campo-lotes.js', 'js/campo-agenda.js', 'js/campo-calculadoras.js', 'js/campo-app.js'
];
const EXTERNOS = [
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js'
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(ARQUIVOS.map(u => new Request(u, { cache: 'reload' })));
    // Sem os SDKs o app funciona só no aparelho, então a falha aqui não impede a instalação
    await Promise.all(EXTERNOS.map(async u => { try { await c.put(u, await fetch(u, { mode: 'no-cors' })); } catch (err) {} }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const nomes = await caches.keys();
    await Promise.all(nomes.filter(n => n.startsWith('stratum-campo-') && n !== CACHE).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const proprio = url.origin === self.location.origin && !url.pathname.startsWith('/api/');
  const fontes = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!proprio && !fontes && EXTERNOS.indexOf(req.url) === -1) return;

  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const chave = req.mode === 'navigate' ? 'campo.html' : req;
    const guardar = r => { if (r && (r.ok || r.type === 'opaque')) c.put(chave, r.clone()); return r; };
    const lerCache = () => c.match(chave, { ignoreSearch: req.mode === 'navigate' });

    // SDK e fontes têm versão na URL: o guardado continua valendo
    if (!proprio) {
      const salvo = await lerCache();
      return salvo || fetch(req).then(guardar);
    }
    const rede = fetch(req).then(guardar);
    const limite = new Promise(ok => setTimeout(() => ok(null), ESPERA_REDE_MS));
    const resposta = await Promise.race([rede.catch(() => null), limite]);
    if (resposta) return resposta;
    const salvo = await lerCache();
    if (salvo) { e.waitUntil(rede.catch(() => {})); return salvo; }
    return rede;
  })());
});
