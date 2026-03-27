/* ──────────────────────────────────────────────
   gallery-slider.js — Sliding Gallery Component
   Auto-advancing image carousel with thumbnails,
   captions, nav arrows, and touch support.
   ────────────────────────────────────────────── */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var chevronLeft =
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>';
  var chevronRight =
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>';

  document.querySelectorAll('.gallery-slider').forEach(function (slider) {
    var interval = parseInt(slider.getAttribute('data-interval'), 10) || 5000;
    var slides = Array.from(slider.querySelectorAll('.gallery-slider__slide'));
    if (slides.length === 0) return;

    var currentIndex = 0;
    var advanceTimer = null;
    var blinkTimer = null;
    var isPaused = false;

    // ── Build DOM ──

    // Viewport
    var viewport = document.createElement('div');
    viewport.className = 'gallery-slider__viewport';
    viewport.setAttribute('role', 'region');
    viewport.setAttribute('aria-label', 'Image slideshow');

    // Track
    var track = document.createElement('div');
    track.className = 'gallery-slider__track';
    slides.forEach(function (slide) { track.appendChild(slide); });
    viewport.appendChild(track);

    // Caption
    var caption = document.createElement('div');
    caption.className = 'gallery-slider__caption';

    // Thumbnails
    var thumbsContainer = document.createElement('div');
    thumbsContainer.className = 'gallery-slider__thumbs';
    var thumbs = [];

    slides.forEach(function (slide, i) {
      var img = slide.querySelector('img');
      if (!img) return;
      var thumb = document.createElement('img');
      thumb.className = 'gallery-slider__thumb';
      thumb.src = img.src;
      thumb.alt = 'Slide ' + (i + 1);
      thumb.addEventListener('click', function () { goToSlide(i); });
      thumbsContainer.appendChild(thumb);
      thumbs.push(thumb);
    });

    // Nav buttons
    var prevBtn = document.createElement('button');
    prevBtn.className = 'gallery-slider__nav gallery-slider__nav--prev';
    prevBtn.setAttribute('aria-label', 'Previous slide');
    prevBtn.innerHTML = '<span class="gallery-slider__nav-icon">' + chevronLeft + '</span>';

    var nextBtn = document.createElement('button');
    nextBtn.className = 'gallery-slider__nav gallery-slider__nav--next';
    nextBtn.setAttribute('aria-label', 'Next slide');
    nextBtn.innerHTML = '<span class="gallery-slider__nav-icon">' + chevronRight + '</span>';

    // Assemble
    slider.innerHTML = '';
    slider.appendChild(viewport);
    slider.appendChild(prevBtn);
    slider.appendChild(nextBtn);
    slider.appendChild(caption);
    slider.appendChild(thumbsContainer);

    // ── Core functions ──

    function goToSlide(index) {
      currentIndex = ((index % slides.length) + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

      // Update caption
      var slideCaption = slides[currentIndex].getAttribute('data-caption') || '';
      caption.textContent = slideCaption;

      // Update aria
      slides.forEach(function (s, i) {
        s.setAttribute('aria-hidden', i !== currentIndex ? 'true' : 'false');
      });

      // Update thumbnails
      updateThumbs();

      // Reset auto-advance
      if (!isPaused && !prefersReducedMotion) {
        stopAutoAdvance();
        startAutoAdvance();
      }
    }

    function updateThumbs() {
      thumbs.forEach(function (t, i) {
        t.classList.remove('gallery-slider__thumb--active', 'gallery-slider__thumb--dimmed', 'gallery-slider__thumb--next-up');
        if (i === currentIndex) {
          t.classList.add('gallery-slider__thumb--active');
        } else {
          t.classList.add('gallery-slider__thumb--dimmed');
        }
      });
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    // ── Auto-advance ──

    function startAutoAdvance() {
      stopAutoAdvance();
      // After half the interval, blink the next thumbnail
      blinkTimer = setTimeout(function () {
        var nextIndex = (currentIndex + 1) % slides.length;
        if (thumbs[nextIndex]) {
          thumbs[nextIndex].classList.add('gallery-slider__thumb--next-up');
        }
      }, interval / 2);

      advanceTimer = setTimeout(function () {
        nextSlide();
      }, interval);
    }

    function stopAutoAdvance() {
      clearTimeout(advanceTimer);
      clearTimeout(blinkTimer);
      advanceTimer = null;
      blinkTimer = null;
      // Remove blink from all thumbs
      thumbs.forEach(function (t) {
        t.classList.remove('gallery-slider__thumb--next-up');
      });
    }

    // ── Events ──

    prevBtn.addEventListener('click', function (e) { e.stopPropagation(); prevSlide(); });
    nextBtn.addEventListener('click', function (e) { e.stopPropagation(); nextSlide(); });

    slider.addEventListener('mouseenter', function () {
      isPaused = true;
      stopAutoAdvance();
    });
    slider.addEventListener('mouseleave', function () {
      isPaused = false;
      if (!prefersReducedMotion) startAutoAdvance();
    });

    // Touch swipe
    var touchStartX = 0;
    viewport.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    viewport.addEventListener('touchend', function (e) {
      var delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 50) {
        if (delta < 0) nextSlide();
        else prevSlide();
      }
    }, { passive: true });

    // ── Initialize ──
    goToSlide(0);
    if (!prefersReducedMotion && slides.length > 1) {
      startAutoAdvance();
    }
  });
})();
