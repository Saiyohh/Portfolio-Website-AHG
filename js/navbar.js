/**
 * Navbar — hamburger toggle, escape-to-close, outside-click-to-close
 */
(function () {
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');
  const overlay = document.querySelector('.navbar__overlay');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('is-open');
    if (overlay) overlay.classList.add('is-visible');
    document.body.classList.add('scroll-locked');
  }

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-visible');
    document.body.classList.remove('scroll-locked');
  }

  function toggleMenu() {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close on overlay click
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Close on resize if desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) closeMenu();
  });
})();
