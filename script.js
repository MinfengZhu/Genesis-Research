/* Genesis Research: small progressive enhancement. */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window)) return;

  /* Pause looping animations (hero galaxy, Game of Life) while they are off screen,
     so the page does no animation work for things nobody can see. */
  var loops = document.querySelectorAll(".hero, .page-hero, .life");
  if (!reduce && loops.length) {
    var po = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var el = entry.target;
        var off = !entry.isIntersecting;
        el.classList.toggle("is-paused", off);
        el.querySelectorAll("svg").forEach(function (svg) {
          if (svg.pauseAnimations) off ? svg.pauseAnimations() : svg.unpauseAnimations();
        });
      });
    });
    loops.forEach(function (el) { po.observe(el); });
  }

  /* Browsers that support scroll-driven animations (CSS animation-timeline) reveal
     sections with CSS alone. For the others, fade sections in as they enter view. */
  var native = window.CSS && CSS.supports && CSS.supports("animation-timeline: view()");
  if (reduce || native) return;

  root.classList.add("js-reveal");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
})();
