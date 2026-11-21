/* === Project entries: selection cursor and hover clips ===
   One entry is always selected (.is-selected): the first at rest, then
   whichever was last hovered or focused. On devices that can hover, the
   entry's preview clip loads and plays while the pointer or focus is on it. */
(function () {
  var cards = document.querySelectorAll('.project-card');
  var canHover = window.matchMedia('(hover: hover)').matches;

  cards.forEach(function (card) {
    var video = card.querySelector('video.project-card__gif');

    function select() {
      cards.forEach(function (c) { c.classList.toggle('is-selected', c === card); });
    }

    function play() {
      select();
      // Touch screens never show the clip, so they never download it
      if (!video || !canHover) return;
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
      if (video) video.pause();
    }

    card.addEventListener('mouseenter', play);
    card.addEventListener('focusin', play);
    card.addEventListener('mouseleave', pause);
    card.addEventListener('focusout', pause);
  });
})();
