(() => {
  'use strict';
  const cfg = window.WEDDING_CONFIG || {};
  const files = cfg.images?.gallery || [];
  const grid = document.getElementById('galleryGrid');
  const more = document.getElementById('galleryMore');
  const counter = document.getElementById('galleryCount');
  const box = document.getElementById('lightbox');
  const preview = document.getElementById('lightboxImage');
  const entries = [];
  const initialCount = Math.min(files.length, Math.max(1, Number(cfg.galleryInitialCount) || 8));
  const batchSize = Math.max(1, Number(cfg.galleryBatchSize) || 8);
  let visibleCount = initialCount;
  let current = 0;
  let previousFocus = null;

  const watcher = new IntersectionObserver(changes => {
    changes.forEach(change => {
      if (change.isIntersecting) {
        change.target.classList.add('is-visible');
        watcher.unobserve(change.target);
      }
    });
  }, {threshold: .06});

  files.forEach((src, i) => {
    if (!src) return;
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.className = 'gallery-tile reveal';
    tile.setAttribute('aria-label', 'Xem ảnh cưới ' + (i + 1));
    const photo = document.createElement('img');
    photo.alt = 'Ảnh cưới ' + (i + 1);
    photo.loading = 'lazy';
    photo.decoding = 'async';
    photo.addEventListener('error', () => {
      const index = entries.findIndex(entry => entry.id === i);
      if (index >= 0) entries.splice(index, 1);
      watcher.unobserve(tile);
      tile.remove();
      updateVisibility();
    });
    tile.appendChild(photo);
    tile.addEventListener('click', () => {
      if (tile.hidden) return;
      previousFocus = document.activeElement;
      current = i;
      open();
    });
    grid.appendChild(tile);
    entries.push({id: i, src, tile, photo});
  });

  function updateVisibility() {
    const count = Math.min(visibleCount, entries.length);
    entries.forEach((entry, index) => {
      const visible = index < count;
      entry.tile.hidden = !visible;
      if (visible) {
        if (!entry.photo.getAttribute('src')) entry.photo.src = entry.src;
        watcher.observe(entry.tile);
      }
    });
    if (more) {
      more.hidden = entries.length <= initialCount;
      const expanded = count > initialCount;
      more.setAttribute('aria-expanded', String(expanded));
      const remaining = entries.length - count;
      more.textContent = remaining > 0
        ? 'XEM THÊM ' + Math.min(batchSize, remaining) + ' ẢNH  ↗'
        : 'THU GỌN ALBUM  ↑';
    }
    if (counter) counter.textContent = count + ' / ' + entries.length + ' ẢNH';
  }

  more?.addEventListener('click', () => {
    if (visibleCount >= entries.length) {
      visibleCount = initialCount;
      updateVisibility();
      document.getElementById('gallery')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start'
      });
    } else {
      visibleCount += batchSize;
      updateVisibility();
    }
  });

  function open() {
    const match = entries.find(entry => entry.id === current);
    if (!match) return;
    preview.src = match.src;
    box.classList.add('active');
    box.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    document.getElementById('lightboxClose')?.focus();
  }
  function close() {
    box.classList.remove('active');
    box.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    preview.removeAttribute('src');
    previousFocus?.focus();
  }
  function move(step) {
    const ids = entries.map(entry => entry.id);
    const position = ids.indexOf(current);
    if (position < 0 || !ids.length) return;
    current = ids[(position + step + ids.length) % ids.length];
    preview.src = entries.find(entry => entry.id === current).src;
  }
  document.getElementById('lightboxClose')?.addEventListener('click', close);
  document.getElementById('lightboxPrev')?.addEventListener('click', () => move(-1));
  document.getElementById('lightboxNext')?.addEventListener('click', () => move(1));
  box?.addEventListener('click', event => { if (event.target === box) close(); });
  document.addEventListener('keydown', event => {
    if (!box?.classList.contains('active')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') move(-1);
    if (event.key === 'ArrowRight') move(1);
  });
  updateVisibility();
})();