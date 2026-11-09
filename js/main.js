(() => {
  'use strict';
  const c = window.WEDDING_CONFIG || {};
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => Array.from(root.querySelectorAll(s));
  const groom = c.groomName || 'Tên chú rể';
  const bride = c.brideName || 'Tên cô dâu';
  const start = new Date(c.weddingDate || '2026-12-15T16:30:00+07:00');
  const end = new Date(c.weddingEndDate || '2026-12-16T23:59:59+07:00');
  const valid = !Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime()) && end >= start;
  const zone = 'Asia/Ho_Chi_Minh';
  const fmt = (d, opts) => new Intl.DateTimeFormat('en-GB', {...opts, timeZone:zone}).format(d);
  const day1 = valid ? fmt(start, {day:'2-digit'}) : '15';
  const day2 = valid ? fmt(end, {day:'2-digit'}) : '16';
  const month = valid ? fmt(start, {month:'long'}) : 'December';
  const year = valid ? fmt(start, {year:'numeric'}) : '2026';
  const sameMonth = valid && fmt(start,{month:'2-digit',year:'numeric'}) === fmt(end,{month:'2-digit',year:'numeric'});
  const shortDate = sameMonth
    ? day1 + ' – ' + day2 + ' · ' + fmt(start,{month:'2-digit'}) + ' · ' + year
    : valid ? fmt(start,{day:'2-digit',month:'2-digit',year:'numeric'}) + ' – ' + fmt(end,{day:'2-digit',month:'2-digit',year:'numeric'}) : '15 – 16 · 12 · 2026';
  const longDate = sameMonth ? day1 + ' – ' + day2 + ' ' + month + ' ' + year
    : valid ? fmt(start,{day:'2-digit',month:'long',year:'numeric'}) + ' – ' + fmt(end,{day:'2-digit',month:'long',year:'numeric'}) : '15 – 16 December 2026';
  const weekday = valid ? fmt(start,{weekday:'long'}).toUpperCase() + ' – ' + fmt(end,{weekday:'long'}).toUpperCase() : 'TUESDAY – WEDNESDAY';

  $$('[data-groom]').forEach(el => el.textContent = groom);
  $$('[data-bride]').forEach(el => el.textContent = bride);
  $$('[data-date-label]').forEach(el => el.textContent = shortDate);
  $$('[data-weekday]').forEach(el => el.textContent = weekday);
  $$('[data-lunar-label]').forEach(el => el.textContent = c.lunarDateLabel || '07–08/11/2026 (âm lịch)');
  $$('[data-day]').forEach(el => el.textContent = day1 + '–' + day2);
  $$('[data-month]').forEach(el => el.textContent = month.toUpperCase());
  $$('[data-year]').forEach(el => el.textContent = year);
  $$('[data-monogram]').forEach(el => el.textContent = c.monogram || 'B&L');
  $('#whenTitle').textContent = longDate.toUpperCase();
  $('#countdownLabel').textContent = longDate;
  $('#footerNames').textContent = groom.toUpperCase() + ' & ' + bride.toUpperCase() + ' · ' + year;

  const setPhoto = (name, src) => {
    const el = $('[data-photo="' + name + '"]');
    if (!el || !src) return;
    const img = new Image();
    img.onload = () => {
      el.style.backgroundImage = 'url("' + src.replaceAll('"','%22') + '")';
      el.classList.remove('photo-placeholder');
    };
    img.src = src;
  };
  Object.entries({
    hero:c.images?.hero, storyOne:c.images?.storyOne,
    storyTwo:c.images?.storyTwo, closing:c.images?.closing
  }).forEach(([key,src]) => setPhoto(key,src));

  // Hai địa điểm độc lập. Không suy đoán địa chỉ/ngày giờ của từng gia đình.
  const applyVenue = (side, label) => {
    const v = c.venues?.[side] || {};
    $('[data-' + side + '-venue]').textContent = v.name || 'Địa điểm ' + label;
    const scheduleEl = $('[data-' + side + '-schedule]');
    scheduleEl.replaceChildren();
    const schedule = Array.isArray(v.schedule) ? v.schedule : [];
    if (schedule.length) {
      const heading = document.createElement('p');
      heading.className = 'venue-schedule-title';
      heading.textContent = 'THỜI GIAN TỔ CHỨC';
      scheduleEl.appendChild(heading);
      schedule.forEach(item => {
        const row = document.createElement('div');
        row.className = 'venue-schedule-row';
        const time = document.createElement('strong');
        time.className = 'venue-schedule-time';
        time.textContent = item.time || '';
        const details = document.createElement('div');
        details.className = 'venue-schedule-details';
        const solar = document.createElement('span');
        solar.className = 'venue-schedule-solar';
        solar.textContent = (item.solarDate || '') + ' · Dương lịch';
        const lunar = document.createElement('span');
        lunar.className = 'venue-schedule-lunar';
        lunar.textContent = (item.lunarDate || '') + ' · Âm lịch';
        details.append(solar, lunar);
        row.append(time, details);
        scheduleEl.appendChild(row);
      });
    } else {
      scheduleEl.textContent = v.dateTime || 'Ngày giờ cụ thể sẽ được cập nhật';
    }
    $('[data-' + side + '-address]').textContent = v.address || 'Địa chỉ ' + label + ' sẽ được cập nhật';
    const link = $('#' + side + 'MapLink');
    const target = v.mapUrl || (v.address
      ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(v.address) : '');
    if (target && /^https:\/\//i.test(target)) {
      link.href = target;
      link.textContent = 'GET DIRECTIONS ↗';
      link.removeAttribute('aria-disabled');
      link.classList.remove('link-disabled');
    } else {
      link.removeAttribute('href');
      link.removeAttribute('target');
      link.setAttribute('aria-disabled','true');
      link.classList.add('link-disabled');
      link.textContent = 'BẢN ĐỒ ĐANG CẬP NHẬT';
    }
  };
  applyVenue('groom','Nhà Trai');
  applyVenue('bride','Nhà Gái');

  // Một sự kiện kéo dài 2 ngày trên Google Calendar (không tự gán giờ).
  const calendar = $('#calendarLink');
  if (valid) {
    const dateKey = d => fmt(d,{year:'numeric'}) + fmt(d,{month:'2-digit'}) + fmt(d,{day:'2-digit'});
    const endExclusive = new Date(end.getTime() + 1000);
    const params = new URLSearchParams({
      action:'TEMPLATE',
      text:'Wedding of ' + groom + ' & ' + bride,
      dates: dateKey(start) + '/' + dateKey(endExclusive),
      ctz: zone,
      details: 'Dương lịch: ' + longDate + '\nÂm lịch: ' + (c.lunarDateLabel || '07–08/11/2026') +
        '\nNhà Trai: ' + (c.venues?.groom?.schedule || []).map(x => x.time + ' ' + x.solarDate + ' (âm ' + x.lunarDate + ')').join('; ') +
        '\n' + (c.venues?.groom?.address || '') +
        '\nNhà Gái: ' + (c.venues?.bride?.schedule || []).map(x => x.time + ' ' + x.solarDate + ' (âm ' + x.lunarDate + ')').join('; ') +
        '\n' + (c.venues?.bride?.address || '')
    });
    calendar.href = 'https://calendar.google.com/calendar/render?' + params;
  } else {
    calendar.removeAttribute('href');
    calendar.setAttribute('aria-disabled','true');
  }

  const main = $('#mainContent'), intro = $('#intro'), envelope = $('#envelope');
  $('#openInvitation').addEventListener('click', () => {
    envelope.classList.add('opening');
    setTimeout(() => {
      intro.classList.add('opened');
      intro.setAttribute('aria-hidden','true');
      main.inert = false;
      document.body.classList.remove('is-locked');
      $('#home').scrollIntoView({behavior:'auto'});
    }, 900);
  });

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }), {threshold:.11});
  $$('.reveal').forEach(el => observer.observe(el));

  const audio = $('#backgroundMusic'), musicButton = $('#musicToggle'), musicText = $('#musicText');
  let playing = false;
  if (c.musicEnabled && c.musicFile) audio.src = c.musicFile;
  musicButton.addEventListener('click', async () => {
    if (!c.musicEnabled || !c.musicFile) {
      alert('Nhạc nền chưa được cấu hình.'); return;
    }
    if (playing) {
      audio.pause(); playing = false;
    } else {
      try { await audio.play(); playing = true; }
      catch (err) {
        console.warn('Không phát được nhạc:', err);
        alert('Vui lòng kiểm tra file nhạc trong assets/music.');
      }
    }
    musicButton.classList.toggle('playing', playing);
    musicButton.setAttribute('aria-pressed', String(playing));
    musicButton.setAttribute('aria-label', playing ? 'Tắt nhạc nền' : 'Bật nhạc nền');
    musicText.textContent = playing ? 'MUSIC ON' : 'MUSIC OFF';
  });
})();