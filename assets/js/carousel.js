/* Photo carousel for the Events page.
   The current photo sits in the center; the previous and next ones peek out
   behind it, smaller and blurred. Navigation: click a side photo, swipe on touch screens, use the
   left/right keys while the carousel has focus, or use the hidden "Previous /
   Next photo" buttons, which appear when focused with the keyboard and are
   read by screen readers. */
document.querySelectorAll('.carousel').forEach(function (root) {
  var slides = Array.prototype.slice.call(root.querySelectorAll('.carousel__slide'));
  var status = root.querySelector('.carousel__status');
  var n = slides.length;
  var i = 0;

  function render() {
    slides.forEach(function (s, k) {
      s.classList.remove('is-active', 'is-prev', 'is-next');
      s.removeAttribute('aria-hidden');
      if (k === i) {
        s.classList.add('is-active');
      } else if (n > 1 && k === (i + 1) % n) {
        s.classList.add('is-next');
        s.setAttribute('aria-hidden', 'true');
      } else if (n > 2 && k === (i - 1 + n) % n) {
        s.classList.add('is-prev');
        s.setAttribute('aria-hidden', 'true');
      } else {
        s.setAttribute('aria-hidden', 'true');
      }
    });
  }

  function show(k) {
    i = (k + n) % n;
    render();
    if (status) { status.textContent = 'Photo ' + (i + 1) + ' of ' + n + ': ' + slides[i].alt; }
  }

  render();
  if (n < 2) { return; }

  slides.forEach(function (s, k) {
    s.addEventListener('click', function () {
      if (s.classList.contains('is-prev') || s.classList.contains('is-next')) { show(k); }
    });
  });
  root.querySelectorAll('.carousel__sr-btn').forEach(function (b) {
    b.addEventListener('click', function () { show(i + Number(b.getAttribute('data-dir'))); });
  });
  // Swipe: a mostly horizontal drag of 40px or more changes the photo.
  var x0 = 0, y0 = 0;
  root.addEventListener('touchstart', function (ev) {
    x0 = ev.changedTouches[0].clientX;
    y0 = ev.changedTouches[0].clientY;
  }, { passive: true });
  root.addEventListener('touchend', function (ev) {
    var dx = ev.changedTouches[0].clientX - x0;
    var dy = ev.changedTouches[0].clientY - y0;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.5) { show(dx < 0 ? i + 1 : i - 1); }
  }, { passive: true });
  root.setAttribute('tabindex', '0');
  root.addEventListener('keydown', function (ev) {
    if (ev.key === 'ArrowLeft') { show(i - 1); }
    if (ev.key === 'ArrowRight') { show(i + 1); }
  });
});
