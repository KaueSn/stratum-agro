// ============================================
// PROTEÇÃO CONTRA ROBÔS (login e cadastro)
// ============================================
// Camadas no navegador, sem serviço externo e sem rastrear o usuário:
//   1. Campo-armadilha invisível (robôs que preenchem tudo são barrados).
//   2. Tempo mínimo entre abrir o formulário e enviar.
//   3. Desafio de prova de trabalho (SHA-256): o navegador resolve um
//      cálculo de ~0,5 s em segundo plano. Para uma pessoa é imperceptível;
//      para quem dispara milhares de cadastros, fica caro.
//   4. Espera crescente após senhas erradas seguidas (30 s, 60 s, 2 min...).
// Isto barra robôs de formulário. Quem chama a API do Firebase diretamente
// é contido pelo próprio Firebase (limites e bloqueio de abuso) e pelo
// Firewall da Vercel. Ver docs/AUDITORIA.md.
// ============================================

const Antibot = (() => {
  const BITS = 15;               // dificuldade: ~32 mil hashes em média
  const TEMPO_MIN_MS = 1500;
  const FALHAS_KEY = 'stratum-auth-falhas';
  const estado = {};             // por formulário: { aberto, prova, promessa }

  function hex(buf) { return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join(''); }
  function zerosIniciais(buf) {
    const b = new Uint8Array(buf); let n = 0;
    for (let i = 0; i < b.length; i++) {
      if (b[i] === 0) { n += 8; continue; }
      n += Math.clz32(b[i]) - 24; break;
    }
    return n;
  }

  async function resolver(desafio) {
    if (!(window.crypto && crypto.subtle)) return { desafio, nonce: -1 };   // navegador antigo: não bloqueia
    const enc = new TextEncoder();
    for (let nonce = 0; nonce < 4e6; nonce++) {
      const h = await crypto.subtle.digest('SHA-256', enc.encode(desafio + ':' + nonce));
      if (zerosIniciais(h) >= BITS) return { desafio, nonce, hash: hex(h) };
      if (nonce % 4000 === 0) await new Promise(r => setTimeout(r, 0));   // não trava a tela
    }
    return { desafio, nonce: -1 };
  }

  function widget(id) {
    const el = document.createElement('div');
    el.className = 'ab-box'; el.id = 'ab-' + id;
    el.setAttribute('role', 'status'); el.setAttribute('aria-live', 'polite');
    el.innerHTML = '<span class="ab-ic" aria-hidden="true"></span><span class="ab-txt">Verificação de segurança: aguardando…</span>';
    return el;
  }
  function marcarWidget(id, ok, txt) {
    const el = document.getElementById('ab-' + id); if (!el) return;
    el.classList.toggle('ok', !!ok); el.classList.toggle('run', !ok);
    el.querySelector('.ab-txt').textContent = txt;
  }

  // Prepara um formulário: armadilha + widget antes do botão. Chame ao abrir o formulário.
  function preparar(id, formEl, antesDe) {
    if (!formEl) return;
    if (!formEl.querySelector('.ab-hp')) {
      const hp = document.createElement('div');
      hp.className = 'ab-hp'; hp.setAttribute('aria-hidden', 'true');
      hp.innerHTML = '<label>Não preencha este campo<input type="text" name="website" tabindex="-1" autocomplete="off"></label>';
      formEl.appendChild(hp);
    }
    if (!document.getElementById('ab-' + id) && antesDe) antesDe.parentNode.insertBefore(widget(id), antesDe);
    const s = estado[id] = { aberto: Date.now(), prova: null };
    marcarWidget(id, false, 'Verificação de segurança: confirmando que você é humano…');
    const desafio = Date.now().toString(36) + '-' + hex(crypto.getRandomValues(new Uint8Array(12)));
    s.promessa = resolver(desafio).then(p => { s.prova = p; marcarWidget(id, true, 'Verificação de segurança concluída'); return p; });
  }

  function segundosBloqueio() {
    try {
      const f = JSON.parse(localStorage.getItem(FALHAS_KEY) || '{}');
      return f.ate && f.ate > Date.now() ? Math.ceil((f.ate - Date.now()) / 1000) : 0;
    } catch (e) { return 0; }
  }
  function registrarFalha() {
    try {
      const f = JSON.parse(localStorage.getItem(FALHAS_KEY) || '{}');
      f.n = (f.n || 0) + 1;
      if (f.n >= 3) f.ate = Date.now() + Math.min(15 * 60, 30 * Math.pow(2, f.n - 3)) * 1000;
      localStorage.setItem(FALHAS_KEY, JSON.stringify(f));
    } catch (e) {}
  }
  function registrarSucesso() { try { localStorage.removeItem(FALHAS_KEY); } catch (e) {} }

  // Valida antes de enviar. Retorna '' se pode seguir, ou a mensagem de erro.
  async function validar(id, formEl) {
    const espera = segundosBloqueio();
    if (espera) return 'Muitas tentativas seguidas. Aguarde ' + espera + ' s e tente de novo.';
    const hp = formEl && formEl.querySelector('.ab-hp input');
    if (hp && hp.value) return 'Não foi possível concluir. Recarregue a página.';
    const s = estado[id];
    if (!s) return 'Recarregue a página e tente de novo.';
    if (Date.now() - s.aberto < TEMPO_MIN_MS) return 'Aguarde um instante e tente de novo.';
    if (!s.prova) { marcarWidget(id, false, 'Verificação de segurança: finalizando…'); await s.promessa; }
    return '';
  }

  return { preparar, validar, registrarFalha, registrarSucesso, segundosBloqueio };
})();
