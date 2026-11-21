/**
 * Lightbox: images marked .lightbox-trigger open larger, with previous and
 * next, Escape to close and arrow keys to move.
 */
(function () {
  var triggers = Array.prototype.slice.call(document.querySelectorAll('.lightbox-trigger'));
  if (!triggers.length) return;

  var box = null;
  var image = null;
  var prevBtn = null;
  var nextBtn = null;
  var closeBtn = null;
  var current = -1;
  var opener = null;
  var items = [];

  // What Previous and Next step through. A viewer's stage image steps through
  // that viewer's stills; any other image steps through the page's images.
  function itemsFor(trigger) {
    var viewer = trigger.closest('.viewer');
    if (viewer) {
      var stills = Array.prototype.slice.call(viewer.querySelectorAll('.viewer__thumb[data-image]'));
      if (stills.length) {
        return stills.map(function (t) {
          return { src: t.dataset.image, alt: t.dataset.alt || '', pressed: t.getAttribute('aria-pressed') === 'true' };
        });
      }
    }
    return triggers.filter(function (t) { return !t.closest('.viewer'); }).map(function (t) {
      return { src: t.getAttribute('data-full-src') || t.currentSrc || t.src, alt: t.alt || '', el: t };
    });
  }

  function build() {
    box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Image viewer');
    box.innerHTML =
      '<div class="lightbox__bar">' +
      '<button type="button" class="block lightbox__prev">Previous</button>' +
      '<button type="button" class="block lightbox__next">Next</button>' +
      '<button type="button" class="block lightbox__close">Close</button>' +
      '</div>' +
      '<img class="lightbox__image" src="" alt="">';
    document.body.appendChild(box);

    image = box.querySelector('.lightbox__image');
    prevBtn = box.querySelector('.lightbox__prev');
    nextBtn = box.querySelector('.lightbox__next');
    closeBtn = box.querySelector('.lightbox__close');

    prevBtn.addEventListener('click', function () { show(current - 1); });
    nextBtn.addEventListener('click', function () { show(current + 1); });
    closeBtn.addEventListener('click', close);
    // a click on the empty field around the image closes it
    box.addEventListener('click', function (e) {
      if (e.target === box) close();
    });
  }

  function show(index) {
    if (index < 0 || index >= items.length) return;
    current = index;
    image.src = items[index].src;
    image.alt = items[index].alt;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === items.length - 1;
    // nothing to step through when there is one image
    prevBtn.hidden = nextBtn.hidden = items.length < 2;
  }

  function open(trigger) {
    if (!box) build();
    opener = trigger;
    items = itemsFor(trigger);
    var start = 0;
    items.forEach(function (item, i) {
      if (item.el === trigger || item.pressed) start = i;
    });
    show(start);
    box.classList.add('is-open');
    document.body.classList.add('scroll-locked');
    closeBtn.focus();
  }

  function close() {
    if (!box || !box.classList.contains('is-open')) return;
    box.classList.remove('is-open');
    document.body.classList.remove('scroll-locked');
    current = -1;
    if (opener) opener.focus();
  }

  triggers.forEach(function (t) {
    // images are not focusable on their own
    t.tabIndex = 0;
    t.setAttribute('role', 'button');
    t.addEventListener('click', function () { open(t); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(t);
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (!box || !box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
    // keep Tab inside the viewer
    if (e.key === 'Tab') {
      var stops = [prevBtn, nextBtn, closeBtn].filter(function (b) { return !b.disabled && !b.hidden; });
      var first = stops[0];
      var last = stops[stops.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();
