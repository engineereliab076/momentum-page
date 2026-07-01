/* =========================================================
   MOMENTUM — vanilla JS
   Three small, independent enhancements:
   1. Scroll-triggered fade-ins (IntersectionObserver)
   2. Mobile nav toggle
   3. Contact-form handling (front-end only)
   ========================================================= */

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

  /* ---- 2. Mobile navigation toggle ----------------------- */
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");

  if (nav && toggle) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // Close the menu after tapping a link
    nav.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- 3. Contact form ----------------------------------
     No backend yet — this validates and shows a confirmation.
     To make it live, set a real `action`/endpoint (e.g.
     Formspree, Netlify Forms, or your own API) and remove
     the preventDefault below. */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        status.textContent = "Please fill in all fields with a valid email.";
        form.reportValidity();
        return;
      }

      const name = form.elements.name.value.trim();
      status.textContent = `Thanks, ${name}! We'll be in touch shortly.`;
      form.reset();
    });
  }

  /* ---- Footer year (auto-updates) ------------------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
