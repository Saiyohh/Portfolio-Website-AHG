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

  var projectsHref = inProjects ? './' : './projects/';
  var resumeHref = inProjects ? '../resume.html' : './resume.html';
  var homeHref = inProjects ? '../' : './';
  var itchIcon = prefix + 'assets/icons/itchio-textless-black.svg';

  // ── Fonts for the shared nav (pages that already link them are skipped) ──
  if (!document.querySelector('link[href*="Jersey+15"]')) {
    var fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Jersey+15&family=Atkinson+Hyperlegible:wght@400;700&display=swap';
    document.head.appendChild(fontLink);
  }

  // ── Body-text preference: "pixel" or "plain" (default) ──
  var bodyFont = 'plain';
  try {
    if (localStorage.getItem('bodyFont') === 'pixel') bodyFont = 'pixel';
  } catch (e) { /* storage blocked: stay on plain */ }
  document.documentElement.setAttribute('data-body-font', bodyFont);

  // ── Navbar ──
  // Each link keeps one fixed fill colour: tri green, sq pink, cir red, x blue, gold.
  function navLink(label, href, colour, current, external) {
    return '<a href="' + href + '" class="block' + (colour ? ' block--' + colour : '') + '"' +
      (current ? ' aria-current="page"' : '') +
      (external ? ' target="_blank" rel="noopener"' : '') +
      '>' + label + '</a>';
  }

  var navLinks = [
    navLink('Projects', projectsHref, 'tri', projectsActive),
    navLink('Resume', resumeHref, 'sq', resumeActive),
    navLink('itch.io', 'https://saiyoh.itch.io/', 'cir', false, true),
    navLink('LinkedIn', 'https://www.linkedin.com/in/alexander-garcia-9144822bb/', 'x', false, true),
    navLink('Email', 'mailto:alexhgarciadesign@gmail.com', 'gold', false)
  ];

  // The mark rests as AHG and opens to ALEX H GARCIA on hover or focus.
  // Every hidden letter gets its own span so it can hop in on its own beat (--i).
  function logoWord(key, cap, rest) {
    var letters = rest.split('').map(function (ch, i) {
      return '<span class="navbar__logo-ch" style="--i:' + i + '">' + ch + '</span>';
    }).join('');
    return '<span class="navbar__logo-word navbar__logo-word--' + key + '" aria-hidden="true">' +
      '<span class="navbar__logo-cap">' + cap + '</span>' +
      '<span class="navbar__logo-rest"><span>' + letters + '</span></span>' +
    '</span>';
  }

  var fontToggle =
    '<div class="font-toggle" role="group" aria-label="Body text style">' +
      '<button type="button" data-body-font="pixel" aria-pressed="' + (bodyFont === 'pixel') + '" aria-label="Pixel body text" title="Pixel body text">Aa</button>' +
      '<button type="button" data-body-font="plain" aria-pressed="' + (bodyFont === 'plain') + '" aria-label="Plain body text" title="Plain body text">Aa</button>' +
    '</div>';

  var navbarHTML =
    '<nav class="navbar" aria-label="Main navigation">' +
      '<div class="navbar__inner">' +
        '<a href="' + homeHref + '" class="navbar__logo" aria-label="Alex H Garcia, home">' +
          logoWord('a', 'A', 'lex') + logoWord('h', 'H', '') + logoWord('g', 'G', 'arcia') +
        '</a>' +
        '<ul class="navbar__links"><li>' + navLinks.join('</li><li>') + '</li></ul>' +
        fontToggle +
        '<button type="button" class="navbar__hamburger block" aria-expanded="false" aria-controls="navbar-menu">' +
          '<span class="navbar__hamburger-open">Menu</span>' +
          '<span class="navbar__hamburger-close">Close</span>' +
        '</button>' +
      '</div>' +
      '<div class="navbar__overlay"></div>' +
      '<div class="navbar__mobile-menu" id="navbar-menu">' +
        '<ul class="navbar__mobile-links"><li>' + navLinks.join('</li><li>') + '</li></ul>' +
        fontToggle +
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
            '<span class="footer__icon" style="-webkit-mask-image:url(' + itchIcon + ');mask-image:url(' + itchIcon + ')"></span> itch.io' +
          '</a>' +
          '<a href="https://www.linkedin.com/in/alexander-garcia-9144822bb/" class="footer__link" target="_blank" rel="noopener">' +
            linkedInSvg + ' LinkedIn' +
          '</a>' +
          '<a href="mailto:alexhgarciadesign@gmail.com" class="footer__link">' +
            emailSvg + ' Email' +
          '</a>' +
        '</div>' +
      '</div>' +
    '</footer>';

  // Inject
  var navPlaceholder = document.getElementById('navbar-placeholder');
  if (navPlaceholder) navPlaceholder.outerHTML = navbarHTML;

  var footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) footerPlaceholder.outerHTML = footerHTML;

  // Body-text toggle (one in the header, one in the menu panel)
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.font-toggle button');
    if (!btn) return;
    var choice = btn.getAttribute('data-body-font');
    document.documentElement.setAttribute('data-body-font', choice);
    try { localStorage.setItem('bodyFont', choice); } catch (err) { /* not saved */ }
    document.querySelectorAll('.font-toggle button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-body-font') === choice));
    });
  });
})();
