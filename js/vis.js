(function () {
  var elementer = document.querySelectorAll(".vis");
  if (!("IntersectionObserver" in window)) {
    elementer.forEach(function (el) { el.classList.add("er-synlig"); });
    return;
  }
  var observer = new IntersectionObserver(function (poster) {
    poster.forEach(function (post) {
      if (post.isIntersecting) {
        post.target.classList.add("er-synlig");
        observer.unobserve(post.target);
      }
    });
  }, { threshold: 0.15 });
  elementer.forEach(function (el, i) {
    el.style.transitionDelay = (i % 3) * 80 + "ms";
    observer.observe(el);
  });
})();
