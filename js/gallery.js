(() => {
  const gallery = document.getElementById("corel-gallery");
  if (!gallery) return;

  const slides = Array.from(gallery.querySelectorAll(".gallery-slide"));
  const dots = Array.from(document.querySelectorAll(".gallery-dot"));
  const previous = gallery.querySelector(".gallery-prev");
  const next = gallery.querySelector(".gallery-next");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let current = 0;
  let timer;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle("is-active", active);
      if (active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  function stopAutoPlay() {
    window.clearInterval(timer);
  }

  function startAutoPlay() {
    stopAutoPlay();
    if (!reducedMotion.matches) {
      timer = window.setInterval(() => showSlide(current + 1), 5000);
    }
  }

  previous.addEventListener("click", () => {
    showSlide(current - 1);
    startAutoPlay();
  });
  next.addEventListener("click", () => {
    showSlide(current + 1);
    startAutoPlay();
  });
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startAutoPlay();
    });
  });

  gallery.addEventListener("mouseenter", stopAutoPlay);
  gallery.addEventListener("mouseleave", startAutoPlay);
  gallery.addEventListener("focusin", stopAutoPlay);
  gallery.addEventListener("focusout", (event) => {
    if (!gallery.contains(event.relatedTarget)) startAutoPlay();
  });
  reducedMotion.addEventListener?.("change", startAutoPlay);

  showSlide(0);
  startAutoPlay();
})();
