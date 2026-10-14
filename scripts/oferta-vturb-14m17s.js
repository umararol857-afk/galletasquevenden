/* Desbloqueia a oferta quando o vídeo VTurb atinge 14:17 (857 segundos).
   O gatilho usa a posição REAL do vídeo (não o tempo na página).
   Não adiciona ferramentas de rastreamento. */
(() => {
  'use strict';
  const LIMITE_SEGUNDOS = 14 * 60 + 17;
  const player = document.getElementById('vid-6ace6f80f6a57d8e37bbdaa6');
  if (!player) return;

  let liberada = false;
  const liberarOferta = () => {
    if (liberada) return;
    liberada = true;
    document.querySelectorAll('section[data-oferta-vturb="oculta"]').forEach((secao) => {
      secao.removeAttribute('data-oferta-vturb');
    });
    player.removeEventListener('video:timeupdate', verificarTempo);
  };

  function verificarTempo(event) {
    const tempoVideo = Number(event.detail && event.detail.time);
    if (Number.isFinite(tempoVideo) && tempoVideo >= LIMITE_SEGUNDOS) {
      liberarOferta();
    }
  }
  player.addEventListener('video:timeupdate', verificarTempo);
})();
