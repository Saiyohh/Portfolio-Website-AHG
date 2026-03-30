/* === Thumbnail Hover: lazy-load GIF on mouseenter === */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-card').forEach(card => {
    const gif = card.querySelector('.project-card__gif');
    if (!gif) return;

    card.addEventListener('mouseenter', () => {
      // Lazy-load GIF src on first hover
      if (!gif.src || gif.src === window.location.href) {
        const gifSrc = gif.getAttribute('data-gif');
        if (gifSrc) gif.src = gifSrc;
      }
    });
  });
});
