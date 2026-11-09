(() => {
  const c = window.WEDDING_CONFIG || {};
  const start = new Date(c.weddingDate || '2026-12-15T16:30:00+07:00').getTime();
  const end = new Date(c.weddingEndDate || '2026-12-16T23:59:59+07:00').getTime();
  const ids = ['days','hours','minutes','seconds'];
  const counter = document.getElementById('countdown');
  const section = document.querySelector('.countdown-section');
  const heading = section.querySelector('.display-title');
  const eyebrow = section.querySelector('.eyebrow');
  const label = document.getElementById('countdownLabel');
  let interval;

  function tick() {
    const now = Date.now();
    if (!Number.isFinite(start) || !Number.isFinite(end)) {
      counter.hidden = true;
      label.textContent = 'Vui lòng cập nhật ngày cưới hợp lệ.';
      return;
    }
    if (now > end) {
      counter.hidden = true;
      eyebrow.textContent = 'FOREVER IN OUR HEARTS';
      heading.innerHTML = 'A day to <i>remember.</i>';
      label.textContent = 'Ngày vui đã diễn ra · ' + document.getElementById('whenTitle').textContent;
      clearInterval(interval);
      return;
    }
    if (now >= start) {
      counter.hidden = true;
      eyebrow.textContent = 'THE CELEBRATION IS HERE';
      heading.innerHTML = 'Today is <i>our day.</i>';
      label.textContent = document.getElementById('whenTitle').textContent + ' · A celebration of love';
      return;
    }
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
  tick();
  interval = setInterval(tick, 1000);
})();