(() => {
  'use strict';
  const cfg = window.WEDDING_CONFIG || {};
  const gifts = cfg.gifts || {};
  const t = (key) => window.WEDDING_I18N.t(key);
  const $ = selector => document.querySelector(selector);

  ['groom','bride'].forEach(side => {
    const data = gifts[side] || {};
    const bank = $('[data-gift-bank="' + side + '"]');
    const account = $('[data-gift-account="' + side + '"]');
    const holder = $('[data-gift-holder="' + side + '"]');
    const qr = $('[data-gift-qr="' + side + '"]');
    const qrPlaceholder = $('[data-gift-qr-placeholder="' + side + '"]');
    const copyButton = $('[data-gift-copy="' + side + '"]');
    const status = $('[data-gift-status="' + side + '"]');
    if (!bank || !account || !holder || !qr || !qrPlaceholder || !copyButton) return;

    function render() {
      bank.textContent = (data.bankName || '').trim() || t('accountPending');
      account.textContent = (data.accountNumber || '').trim() || t('accountPending');
      holder.textContent = (data.accountHolder || '').trim() || t('accountPending');
      if (status.dataset.statusKey) status.textContent = t(status.dataset.statusKey);
    }
    render();
    document.addEventListener('wedding:languagechange',render);

    if ((data.qrImage || '').trim()) {
      const src = data.qrImage.trim();
      qr.onload = () => {
        qr.hidden = false;
        qrPlaceholder.hidden = true;
      };
      qr.onerror = () => {
        qr.hidden = true;
        qrPlaceholder.hidden = false;
        console.warn('Không tìm thấy ảnh QR:', src);
      };
      qr.src = src;
    }

    if ((data.accountNumber || '').trim()) {
      copyButton.hidden = false;
      copyButton.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(data.accountNumber.trim());
          status.dataset.statusKey = 'copySuccess';
        } catch (error) {
          status.dataset.statusKey = 'copyFail';
        }
        status.textContent = t(status.dataset.statusKey);
      });
    }
  });
})();
