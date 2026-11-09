(() => {
  'use strict';
  const cfg = window.WEDDING_CONFIG || {};
  const i18n = window.WEDDING_I18N;
  const t = (key,vars) => i18n.t(key,vars);
  const start = new Date(cfg.weddingDate || '2026-12-15T16:30:00+07:00').getTime();
  const end = new Date(cfg.weddingEndDate || '2026-12-16T23:59:59+07:00').getTime();
  const ids = ['days','hours','minutes','seconds'];
  const counter = document.getElementById('countdown');
  const section = document.querySelector('.countdown-section');
  const heading = section.querySelector('.display-title');
  const eyebrow = section.querySelector('.eyebrow');
  const label = document.getElementById('countdownLabel');

  function tick() {
    const now = Date.now();
    if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) {
      counter.hidden = true;
      label.textContent = t('countInvalid');
      return;
    }
    if (now > end) {
      counter.hidden = true;
      eyebrow.textContent = t('countOverlinePast');
      heading.innerHTML = t('countTitlePast');
      const date=document.getElementById('whenTitle').textContent;
      label.textContent = t('countLabelPast',{date});
      return;
    }
    if (now >= start) {
      counter.hidden = true;
      eyebrow.textContent = t('countOverlineToday');
      heading.innerHTML = t('countTitleToday');
      const date=document.getElementById('whenTitle').textContent;
      label.textContent = t('countLabelToday',{date});
      return;
    }
    counter.hidden = false;
    eyebrow.textContent = t('countdownOverline');
    heading.innerHTML = t('countdownTitle');
    const remain = start - now;
    const vals = [
      Math.floor(remain / 86400000),
      Math.floor(remain % 86400000 / 3600000),
      Math.floor(remain % 3600000 / 60000),
      Math.floor(remain % 60000 / 1000)
    ];
    ids.forEach((id, i) => {
      document.getElementById(id).textContent =
        String(vals[i]).padStart(i === 0 ? 3 : 2, '0');
    });
  }
  document.addEventListener('wedding:languagechange',tick);
  tick();
  setInterval(tick, 1000);
})();
