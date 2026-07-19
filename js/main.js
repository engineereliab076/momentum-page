/* =========================================================
   MOMENTUM — vanilla JS
   Small, independent enhancements:
   1. Scroll-triggered fade-ins (IntersectionObserver)
   2. Footer year
   The consultation request flow lives in js/consultation.js.
   ========================================================= */

/* Ensure every route mounts the shared navigation, including a stale or
   future HTML entry point that still contains a page-level legacy header. */
const mountGlobalNavigation = async () => {
  if (!customElements.get("momentum-navigation")) {
    await import("./navigation.js");
  }

  if (document.querySelector("momentum-navigation")) return;

  const sharedNavigation = document.createElement("momentum-navigation");
  const legacyHeader = document.querySelector("body > .site-header");

  if (legacyHeader) {
    legacyHeader.replaceWith(sharedNavigation);
  } else {
    document.body.prepend(sharedNavigation);
  }
};

mountGlobalNavigation();

document.addEventListener("DOMContentLoaded", () => {
  /* ---- 1. Reveal-on-scroll -------------------------------
     Any element with class .reveal fades up once it enters
     the viewport. Falls back to visible if the browser has
     no IntersectionObserver. */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target); // reveal once, then stop watching
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---- Footer year (auto-updates) ------------------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
