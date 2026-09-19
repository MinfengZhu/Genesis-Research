/* Genesis Research: small progressive enhancement.
   Browsers that support scroll-driven animations (CSS animation-timeline) reveal
   sections with CSS alone. For the others, fade sections in as they enter view. */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var native = window.CSS && CSS.supports && CSS.supports("animation-timeline: view()");
  if (reduce || native || !("IntersectionObserver" in window)) return;

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
