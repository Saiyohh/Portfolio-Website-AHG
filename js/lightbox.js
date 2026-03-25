/**
 * Lightbox — click-to-enlarge images with keyboard nav
 */
(function () {
  let lightboxEl = null;
  let imageEl = null;
  let triggers = [];
  let currentIndex = -1;

  function createLightbox() {
    lightboxEl = document.createElement('div');
    lightboxEl.className = 'lightbox';
    lightboxEl.setAttribute('role', 'dialog');
    lightboxEl.setAttribute('aria-label', 'Image lightbox');

    lightboxEl.innerHTML = `
      <button class="lightbox__close" aria-label="Close lightbox">&times;</button>
      <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous image">&#8249;</button>
      <img class="lightbox__image" src="" alt="">
      <button class="lightbox__nav lightbox__nav--next" aria-label="Next image">&#8250;</button>
    `;

    document.body.appendChild(lightboxEl);

    imageEl = lightboxEl.querySelector('.lightbox__image');

    // Close on overlay click (but not on image or buttons)
    lightboxEl.addEventListener('click', function (e) {
      if (e.target === lightboxEl) close();
    });

    lightboxEl.querySelector('.lightbox__close').addEventListener('click', close);
    lightboxEl.querySelector('.lightbox__nav--prev').addEventListener('click', showPrev);
    lightboxEl.querySelector('.lightbox__nav--next').addEventListener('click', showNext);
  }

  function open(index) {
    if (!lightboxEl) createLightbox();
    currentIndex = index;
    updateImage();
    lightboxEl.classList.add('is-open');
    document.body.classList.add('scroll-locked');
  }

  function close() {
    if (!lightboxEl) return;
    lightboxEl.classList.remove('is-open');
    document.body.classList.remove('scroll-locked');
    currentIndex = -1;
  }

  function updateImage() {
    if (currentIndex < 0 || currentIndex >= triggers.length) return;
    const trigger = triggers[currentIndex];
    const src = trigger.getAttribute('data-full-src') || trigger.src;
    const alt = trigger.alt || '';
    imageEl.src = src;
    imageEl.alt = alt;

    // Update nav button visibility
    const prevBtn = lightboxEl.querySelector('.lightbox__nav--prev');
    const nextBtn = lightboxEl.querySelector('.lightbox__nav--next');
    prevBtn.style.display = currentIndex > 0 ? '' : 'none';
    nextBtn.style.display = currentIndex < triggers.length - 1 ? '' : 'none';
  }

  function showPrev(e) {
    e.stopPropagation();
    if (currentIndex > 0) {
      currentIndex--;
      updateImage();
    }
  }

  function showNext(e) {
    e.stopPropagation();
    if (currentIndex < triggers.length - 1) {
      currentIndex++;
      updateImage();
    }
  }

  // Initialize
  triggers = Array.from(document.querySelectorAll('.lightbox-trigger'));

  triggers.forEach(function (trigger, index) {
    trigger.style.cursor = 'pointer';
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      open(index);
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!lightboxEl || !lightboxEl.classList.contains('is-open')) return;

    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      currentIndex--;
      updateImage();
    }
    if (e.key === 'ArrowRight' && currentIndex < triggers.length - 1) {
      currentIndex++;
      updateImage();
    }
  });
})();
