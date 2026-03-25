/**
 * Table of Contents — auto-generated from h2 elements with scroll spy
 */
(function () {
  const content = document.getElementById('project-content');
  const tocDesktop = document.getElementById('toc-list');
  const tocMobile = document.getElementById('toc-list-mobile');
  const mobileTocToggle = document.querySelector('.project-toc-mobile__toggle');

  if (!content) return;

  const headings = content.querySelectorAll('h2[id]');
  if (headings.length === 0) return;

  // Build TOC links
  function buildTocList(container) {
    if (!container) return;
    headings.forEach(function (heading) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#' + heading.id;
      a.textContent = heading.textContent;
      a.className = container === tocDesktop ? 'project-toc__link' : 'project-toc-mobile__link';
      a.setAttribute('data-target', heading.id);
      li.appendChild(a);
      container.appendChild(li);
    });
  }

  buildTocList(tocDesktop);
  buildTocList(tocMobile);

  // Scroll spy with IntersectionObserver
  if (tocDesktop) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Remove active from all
            tocDesktop.querySelectorAll('.project-toc__link').forEach(function (link) {
              link.classList.remove('is-active');
            });
            // Set active on matching link
            const activeLink = tocDesktop.querySelector('[data-target="' + entry.target.id + '"]');
            if (activeLink) activeLink.classList.add('is-active');
          }
        });
      },
      {
        rootMargin: '-' + (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) + 20) + 'px 0px -60% 0px',
        threshold: 0,
      }
    );

    headings.forEach(function (heading) {
      observer.observe(heading);
    });
  }

  // Mobile TOC toggle
  if (mobileTocToggle) {
    mobileTocToggle.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      if (tocMobile) tocMobile.classList.toggle('is-open');
    });
  }
})();
