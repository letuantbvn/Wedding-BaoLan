(() => {
  'use strict';
  const config = window.WEDDING_CONFIG || {};
  const gifts = config.gifts || {};
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

    bank.textContent = (data.bankName || '').trim() || 'Đang cập nhật';
    account.textContent = (data.accountNumber || '').trim() || 'Đang cập nhật';
    holder.textContent = (data.accountHolder || '').trim() || 'Đang cập nhật';

    if ((data.qrImage || '').trim()) {
      const src = data.qrImage.trim();
      // Không hiện QR giả hoặc QR lỗi: giữ placeholder cho đến khi ảnh tải xong.
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
          status.textContent = 'Đã sao chép số tài khoản.';
        } catch (error) {
          status.textContent = 'Hãy chọn và sao chép số tài khoản phía trên.';
        }
      });
    }
  });
})();