/* Tollkit motion layer (home, Connect, Weigh Station, Fund). Load in <head> without defer so html.m is set before
   first paint (no flash of content that then hides). If anything here fails,
   html.m is removed and the page simply shows everything, static. */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canAnimate = !reduce && 'IntersectionObserver' in window;
  if (canAnimate) root.classList.add('m');

  // Elements that fade up as they scroll into view, per page. Missing ones are skipped.
  var REVEAL = [
    'section h2', 'section .section-sub', '.product', '.step', '.promises li', '.dev-line', 'footer .row',
    'main > .urlbox', 'main > .urlnote', 'main > .card', 'main > .grid2', '.use', '.grp', '.tool',
    '.ws-card', '.faq', '.alert', '.path'
  ].join(',');
  var LIFT = '.product, .step, .promises li, .use, .ws-card, .path';
  var SPOT = '.product, .step, .promises li, .use, main > .card, .ws-card, .urlbox, .path';

  function init() {
    try {
      // Aurora behind the first hero/header on the page.
      var hero = document.querySelector('.hero, header.head');
      if (hero && !hero.querySelector('.aurora')) {
        hero.classList.add('has-aurora');
        var a = document.createElement('div');
        a.className = 'aurora'; a.setAttribute('aria-hidden', 'true');
        a.innerHTML = '<div class="drift"><i></i><i></i><i></i></div>';
        hero.insertBefore(a, hero.firstChild);
      }
      if (!canAnimate) return;

      // Hero lines enter one after another.
      if (hero) {
        var kids = hero.querySelectorAll(':scope > .container > *');
        for (var k = 0; k < kids.length; k++) kids[k].style.setProperty('--i', k);
      }

      var fine = matchMedia('(pointer: fine)').matches;
      document.querySelectorAll(LIFT).forEach(function (el) { el.classList.add('lift'); });
      if (fine) document.querySelectorAll(SPOT).forEach(function (el) { el.classList.add('spot'); });

      // Scroll reveal, staggered within each batch that arrives together.
      var targets = Array.prototype.slice.call(document.querySelectorAll(REVEAL))
        .filter(function (el) { return !el.closest('.hero, header.head, nav'); });
      var io = new IntersectionObserver(function (entries) {
        var n = 0;
        entries
          .filter(function (e) { return e.isIntersecting; })
          .sort(function (x, y) {
            var a = x.boundingClientRect, b = y.boundingClientRect;
            return (a.top - b.top) || (a.left - b.left);
          })
          .forEach(function (e) {
            var el = e.target;
            el.style.setProperty('--i', Math.min(n++, 8));
            el.classList.add('in');
            io.unobserve(el);
            // Once it has arrived, hand the element back to its normal hover transitions.
            setTimeout(function () {
              el.removeAttribute('data-r'); el.classList.remove('in'); el.style.removeProperty('--i');
            }, 1700);
          });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
      targets.forEach(function (el) {
        // Anything already scrolled past (reload mid-page) just shows.
        if (el.getBoundingClientRect().bottom < 0) return;
        el.setAttribute('data-r', '');
        io.observe(el);
      });

      // Cursor spotlight: track the pointer inside each card.
      if (fine) {
        document.addEventListener('pointermove', function (ev) {
          var el = ev.target.closest && ev.target.closest('.spot');
          if (!el) return;
          var r = el.getBoundingClientRect();
          el.style.setProperty('--mx', (ev.clientX - r.left) + 'px');
          el.style.setProperty('--my', (ev.clientY - r.top) + 'px');
        }, { passive: true });
      }

      // Aurora leans gently toward the pointer.
      var drift = hero && hero.querySelector('.aurora .drift');
      if (drift && fine) {
        var px = 0, py = 0, raf = 0;
        window.addEventListener('pointermove', function (ev) {
          px = ev.clientX / innerWidth - 0.5; py = ev.clientY / innerHeight - 0.5;
          if (!raf) raf = requestAnimationFrame(function () {
            raf = 0; drift.style.transform = 'translate(' + (px * 28) + 'px,' + (py * 20) + 'px)';
          });
        }, { passive: true });
      }

      // Nav shadow and scroll progress.
      var nav = document.querySelector('nav.top');
      var bar = document.createElement('div');
      bar.className = 'tk-progress'; bar.setAttribute('aria-hidden', 'true');
      document.body.appendChild(bar);
      var ticking = false;
      function onScroll() {
        if (ticking) return; ticking = true;
        requestAnimationFrame(function () {
          ticking = false;
          var y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
          if (nav) nav.classList.toggle('scrolled', y > 8);
          bar.style.setProperty('--p', max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
        });
      }
      addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    } catch (err) {
      // Never leave content hidden because of a script error.
      root.classList.remove('m');
      document.querySelectorAll('[data-r]').forEach(function (el) { el.removeAttribute('data-r'); });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
