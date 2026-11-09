(() => {
  'use strict';
  const cfg = window.WEDDING_CONFIG || {};
  const t = (key) => window.WEDDING_I18N.t(key);
  const form = document.getElementById('rsvpForm');
  const status = document.getElementById('formStatus');
  const button = document.getElementById('rsvpSubmit');
  const guestCount = document.getElementById('guestCount');
  const attendance = [...form.querySelectorAll('input[name="attendance"]')];

  function setStatus(key, color) {
    status.dataset.statusKey = key;
    status.textContent = t(key);
    if (color) status.style.color = color;
  }
  // Values sent to Apps Script remain Vietnamese for backward compatibility,
  // independently of the visible language chosen by the guest.
  attendance.forEach(input => input.addEventListener('change', () => {
    if (!input.checked) return;
    const coming = input.value.startsWith('Có');
    guestCount.disabled = !coming;
    if (!coming) guestCount.value = '1';
  }));

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (!cfg.googleScriptUrl) {
      setStatus('rsvpNotConnected','#965b44'); return;
    }
    const values = Object.fromEntries(new FormData(form).entries());
    if (!['Nhà Trai','Nhà Gái'].includes(values.guestSide)) {
      setStatus('rsvpSelectSide','#965b44'); return;
    }
    if (values.attendance?.startsWith('Rất tiếc')) values.guestCount = '0';
    Object.assign(values, {
      weddingDate:(cfg.weddingDate||'').slice(0,10)+' - '+(cfg.weddingEndDate||'').slice(0,10),
      submittedAt:new Date().toISOString()
    });
    button.disabled = true;
    setStatus('rsvpSending','#796c5d');
    try {
      // no-cors returns an opaque response: verify actual records in Google Sheets.
      await fetch(cfg.googleScriptUrl,{
        method:'POST',mode:'no-cors',
        headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
        body:new URLSearchParams(values).toString()
      });
      setStatus('rsvpSuccess','#60795f');
      form.reset();
      guestCount.disabled = false;
    } catch (err) {
      console.error(err);
      setStatus('rsvpError','#965b44');
    } finally {
      button.disabled = false;
    }
  });
  document.addEventListener('wedding:languagechange', () => {
    if (status.dataset.statusKey) status.textContent = t(status.dataset.statusKey);
  });
})();
