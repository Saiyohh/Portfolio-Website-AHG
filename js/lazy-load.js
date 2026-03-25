/**
 * Lazy loading fallback using IntersectionObserver
 * For browsers that don't support native loading="lazy"
 */
(function () {
  // If native lazy loading is supported, do nothing
  if ('loading' in HTMLImageElement.prototype) return;

  const images = document.querySelectorAll('img[loading="lazy"]');

  if (images.length === 0) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: '200px',
    }
  );

  images.forEach(function (img) {
    observer.observe(img);
  });
})();
