/* Thumbnail slideshow for project entries.
   data-slideshow on .strip__media — continuous marquee scroll */

(function () {
  /* === Image slideshow (continuous marquee) === */
  document.querySelectorAll('[data-slideshow]').forEach(function (container) {
    var srcs = JSON.parse(container.dataset.slideshow);
    if (srcs.length < 1) return;

    // Remove the static <img>
    var staticImg = container.querySelector('img');
    var altText = staticImg ? staticImg.alt : '';
    if (staticImg) staticImg.remove();

    // Build the track with images duplicated for seamless loop
    var track = document.createElement('div');
    track.className = 'slideshow__track';

    // Two full sets so the animation loops seamlessly
    for (var r = 0; r < 2; r++) {
      srcs.forEach(function (src) {
        var img = document.createElement('img');
        img.src = src;
        img.alt = altText;
        track.appendChild(img);
      });
    }

    container.appendChild(track);

    // Wait for images to load so we can measure the first set's width
    var images = track.querySelectorAll('img');
    var loaded = 0;
    var total = images.length;

    function onAllLoaded() {
      // Measure width of the first set of images
      var firstSetWidth = 0;
      for (var i = 0; i < srcs.length; i++) {
        firstSetWidth += images[i].offsetWidth;
      }

      // Create a dynamic keyframe for this specific track
      var id = 'slideshow-' + Math.random().toString(36).substr(2, 6);
      var style = document.createElement('style');
      style.textContent =
        '@keyframes ' + id + ' {' +
        '  0% { transform: translateX(0); }' +
        '  100% { transform: translateX(-' + firstSetWidth + 'px); }' +
        '}';
      document.head.appendChild(style);

      // Apply the animation
      var duration = container.dataset.slideshowDuration || '20s';
      track.style.animation = id + ' ' + duration + ' linear infinite';
    }

    images.forEach(function (img) {
      if (img.complete) {
        loaded++;
        if (loaded === total) onAllLoaded();
      } else {
        img.addEventListener('load', function () {
          loaded++;
          if (loaded === total) onAllLoaded();
        });
      }
    });
  });
})();
