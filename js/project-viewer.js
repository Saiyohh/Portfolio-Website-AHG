/**
 * Project viewer: the thumbnails under the stage swap what it shows, and the
 * Pause block stops and starts the clip.
 * A thumbnail carries data-video (a clip) or data-image (a still).
 */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.viewer').forEach(function (viewer) {
    var video = viewer.querySelector('.viewer__stage video');
    var image = viewer.querySelector('.viewer__stage img');
    var toggle = viewer.querySelector('.viewer__pause');
    var thumbs = Array.prototype.slice.call(viewer.querySelectorAll('.viewer__thumb'));

    function setPaused(paused) {
      if (!video) return;
      if (paused) {
        video.pause();
      } else {
        video.play().catch(function () {});
      }
      if (toggle) {
        toggle.textContent = paused ? 'Play' : 'Pause';
        toggle.setAttribute('aria-pressed', paused ? 'true' : 'false');
      }
    }

    if (video) {
      // with motion reduced the clip waits for the visitor to start it
      if (reduce) {
        video.removeAttribute('autoplay');
        setPaused(true);
      }
      if (toggle) {
        toggle.addEventListener('click', function () {
          setPaused(!video.paused);
        });
      }
    }

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        thumbs.forEach(function (t) {
          t.setAttribute('aria-pressed', t === thumb ? 'true' : 'false');
        });

        var isClip = Boolean(thumb.dataset.video);

        if (isClip && video) {
          video.poster = thumb.dataset.poster || '';
          if (video.getAttribute('src') !== thumb.dataset.video) {
            video.src = thumb.dataset.video;
          }
          video.setAttribute('aria-label', thumb.getAttribute('aria-label') || '');
          setPaused(reduce);
        } else if (image) {
          image.src = thumb.dataset.image;
          image.alt = thumb.dataset.alt || '';
          if (video) video.pause();
        }

        // a stage that holds both a clip and a still shows one at a time
        if (video && image) {
          video.hidden = !isClip;
          image.hidden = isClip;
          if (toggle) toggle.hidden = !isClip;
        }
      });
    });
  });
})();
