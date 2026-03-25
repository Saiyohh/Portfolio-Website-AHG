/**
 * Tag-based project filtering with fade transitions
 */
(function () {
  const filterButtons = document.querySelectorAll('.filter-tag');
  const cards = document.querySelectorAll('.project-card');

  if (filterButtons.length === 0 || cards.length === 0) return;

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');

      // Update active button
      filterButtons.forEach(function (btn) {
        btn.classList.remove('filter-tag--active');
      });
      this.classList.add('filter-tag--active');

      // Filter cards
      cards.forEach(function (card) {
        const tags = (card.getAttribute('data-tags') || '').split(',');
        const shouldShow = filter === 'all' || tags.includes(filter);

        if (shouldShow) {
          card.classList.remove('project-card--hidden');
          card.classList.remove('project-card--fading');
        } else {
          card.classList.add('project-card--fading');
          // After transition, hide completely
          setTimeout(function () {
            if (card.classList.contains('project-card--fading')) {
              card.classList.add('project-card--hidden');
            }
          }, 250);
        }
      });
    });
  });
})();
