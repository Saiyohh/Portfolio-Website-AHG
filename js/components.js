/* ──────────────────────────────────────────────
   components.js — Shared Navbar & Footer
   Injects unified navigation and footer HTML
   into placeholder elements on every page.
   ────────────────────────────────────────────── */
(function () {
  'use strict';

  var path = window.location.pathname;
  var inProjects = path.indexOf('/projects/') !== -1;
  var prefix = inProjects ? '../' : './';

  // Determine active nav link
  var projectsActive = inProjects;
  var resumeActive = path.indexOf('resume') !== -1;

  var linkedInSvg =
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>' +
    '</svg>';

  var emailSvg =
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>' +
    '</svg>';

  var linkedInSvgFooter =
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="18" height="18">' +
    '<path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>' +
    '</svg>';

  var emailSvgFooter =
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="18" height="18">' +
    '<path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>' +
    '</svg>';

  var projectsClass = 'navbar__link' + (projectsActive ? ' navbar__link--active' : '');
  var resumeClass = 'navbar__link' + (resumeActive ? ' navbar__link--active' : '');

  var projectsHref = inProjects ? './' : './projects/';
  var resumeHref = inProjects ? '../resume.html' : './resume.html';
  var homeHref = inProjects ? '../' : './';
  var itchIcon = prefix + 'assets/icons/itch.png';

  // ── Navbar ──
  var navbarHTML =
    '<nav class="navbar" role="navigation" aria-label="Main navigation">' +
      '<div class="navbar__inner">' +
        '<a href="' + homeHref + '" class="navbar__logo">Alex Garcia</a>' +
        '<div class="navbar__links">' +
          '<a href="' + projectsHref + '" class="' + projectsClass + '">Projects</a>' +
          '<a href="' + resumeHref + '" class="' + resumeClass + '">Resume</a>' +
        '</div>' +
        '<div class="navbar__socials">' +
          '<a href="https://saiyoh.itch.io/" class="navbar__social-link" aria-label="itch.io" target="_blank" rel="noopener">' +
            '<img src="' + itchIcon + '" alt="itch.io" width="20" height="20">' +
          '</a>' +
          '<a href="https://www.linkedin.com/in/alexander-garcia-9144822bb/" class="navbar__social-link" aria-label="LinkedIn" target="_blank" rel="noopener">' +
            linkedInSvg +
          '</a>' +
          '<a href="mailto:alexhgarciadesign@gmail.com" class="navbar__social-link" aria-label="Email">' +
            emailSvg +
          '</a>' +
        '</div>' +
        '<button class="navbar__hamburger" aria-label="Toggle menu" aria-expanded="false">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
      '</div>' +
      '<div class="navbar__overlay"></div>' +
      '<div class="navbar__mobile-menu">' +
        '<a href="' + projectsHref + '" class="' + projectsClass + '">Projects</a>' +
        '<a href="' + resumeHref + '" class="' + resumeClass + '">Resume</a>' +
        '<div class="navbar__mobile-socials">' +
          '<a href="https://saiyoh.itch.io/" class="navbar__social-link" aria-label="itch.io" target="_blank" rel="noopener">' +
            '<img src="' + itchIcon + '" alt="itch.io" width="20" height="20">' +
          '</a>' +
          '<a href="https://www.linkedin.com/in/alexander-garcia-9144822bb/" class="navbar__social-link" aria-label="LinkedIn" target="_blank" rel="noopener">' +
            linkedInSvg +
          '</a>' +
          '<a href="mailto:alexhgarciadesign@gmail.com" class="navbar__social-link" aria-label="Email">' +
            emailSvg +
          '</a>' +
        '</div>' +
      '</div>' +
    '</nav>';

  // ── Footer ──
  var footerHTML =
    '<footer class="footer">' +
      '<div class="container footer__inner">' +
        '<p class="footer__copyright">&copy; 2026 Alexander H Garcia</p>' +
        '<p class="footer__info">NY -&gt; CA</p>' +
        '<div class="footer__links">' +
          '<a href="https://saiyoh.itch.io/" class="footer__link" target="_blank" rel="noopener">' +
            '<img src="' + itchIcon + '" alt="" width="18" height="18"> itch.io' +
          '</a>' +
          '<a href="https://www.linkedin.com/in/alexander-garcia-9144822bb/" class="footer__link" target="_blank" rel="noopener">' +
            linkedInSvgFooter + ' LinkedIn' +
          '</a>' +
          '<a href="mailto:alexhgarciadesign@gmail.com" class="footer__link">' +
            emailSvgFooter + ' Email' +
          '</a>' +
        '</div>' +
      '</div>' +
    '</footer>';

  // Inject
  var navPlaceholder = document.getElementById('navbar-placeholder');
  if (navPlaceholder) navPlaceholder.outerHTML = navbarHTML;

  var footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) footerPlaceholder.outerHTML = footerHTML;
})();
