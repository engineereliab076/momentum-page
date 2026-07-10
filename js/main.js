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

  /* ---- 3. Contact form (Formspree) ----------------------
     Submits to the Formspree endpoint set in the form's
     `action` attribute (see index.html — paste your form ID
     there). We POST via fetch so the page never reloads and
     we can show an inline confirmation. */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        status.textContent = "Please fill in all fields with a valid email.";
        form.reportValidity();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      status.textContent = "Sending…";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          status.textContent = "Thanks — we'll be in touch.";
          form.reset();
        } else {
          // Formspree returns JSON errors (e.g. before the form ID is set up)
          status.textContent =
            "Sorry, something went wrong. Please email us directly.";
        }
      } catch (err) {
        status.textContent =
          "Network error. Please check your connection or email us directly.";
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  /* ---- Footer year (auto-updates) ------------------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
