/* Simple photo carousel for the Events page: arrows, dots and autoplay loop. */
document.querySelectorAll('.carousel').forEach(function (root) {
  var slides = root.querySelectorAll('.carousel__slide');
  var dots = root.querySelectorAll('.carousel__dot');
  if (slides.length < 2) { return; }
  var i = 0;
  var delay = parseInt(root.dataset.interval, 10) || 4000;
  var timer = null;

  function show(n) {
    slides[i].classList.remove('is-active');
    if (dots[i]) { dots[i].classList.remove('is-active'); }
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('is-active');
    if (dots[i]) { dots[i].classList.add('is-active'); }
  }
  function start() { stop(); timer = setInterval(function () { show(i + 1); }, delay); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  root.querySelector('.carousel__btn--prev').addEventListener('click', function () { show(i - 1); start(); });
  root.querySelector('.carousel__btn--next').addEventListener('click', function () { show(i + 1); start(); });
  dots.forEach(function (d, k) { d.addEventListener('click', function () { show(k); start(); }); });
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  start();
});
