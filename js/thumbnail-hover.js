/* === Thumbnail hover: load and play the card's preview video on hover/focus === */
(function () {
  document.querySelectorAll('.project-card').forEach(function (card) {
    var video = card.querySelector('video.project-card__gif');
    if (!video) return;

    function play() {
      // Attach the source on first hover so nothing downloads until needed
      if (!video.getAttribute('src')) {
        var src = video.getAttribute('data-src');
        if (!src) return;
        video.src = src;
      }
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    }

    function pause() {
      video.pause();
    }

    card.addEventListener('mouseenter', play);
    card.addEventListener('focusin', play);
    card.addEventListener('mouseleave', pause);
    card.addEventListener('focusout', pause);
  });
})();
