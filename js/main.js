/* =========================================================
   MOMENTUM — vanilla JS
   Small, independent enhancements:
   1. Scroll-triggered fade-ins (IntersectionObserver)
   2. Contact-form handling + package enquiry prefill
   3. Footer year
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

  /* ---- 2. Contact form + package preselection -----------
     Submits to the Formspree endpoint set in the form's
     `action` attribute (see index.html — paste your form ID
     there). We POST via fetch so the page never reloads and
     we can show an inline confirmation.

     services.html links here with
     ?service=…&solution=…&package=…#contact. The matching
     service option is selected and the package details are
     kept in dedicated hidden fields, so editing the project
     message never removes the original selection. */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    const serviceField = document.getElementById("service");
    const solutionField = document.getElementById("selected-solution");
    const packageField = document.getElementById("selected-package");
    const enquiryContext = document.getElementById("enquiry-context");
    const enquiryContextValue = document.getElementById("enquiry-context-value");
    const params = new URLSearchParams(window.location.search);

    const setStatus = (message, state = "") => {
      status.textContent = message;
      status.classList.remove("is-error", "is-success");
      if (state) status.classList.add(`is-${state}`);
    };

    const applyEnquiryPrefill = () => {
      const service = params.get("service")?.trim() || "";
      const solution = params.get("solution")?.trim() || "";
      const pkg = params.get("package")?.trim() || "";

      if (service && serviceField) {
        const matchingOption = Array.from(serviceField.options).find(
          (option) => option.value.toLowerCase() === service.toLowerCase()
        );
        if (matchingOption) serviceField.value = matchingOption.value;
      }

      if (solutionField) solutionField.value = solution;
      if (packageField) packageField.value = pkg;

      const selectedItem = pkg || solution;
      if (enquiryContext && enquiryContextValue && selectedItem) {
        enquiryContextValue.textContent = service
          ? `${selectedItem} — ${service}`
          : selectedItem;
        enquiryContext.hidden = false;
      }
    };

    applyEnquiryPrefill();

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        setStatus("Please complete the required fields and check your email address.", "error");
        form.reportValidity();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const defaultButtonText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.setAttribute("aria-busy", "true");
      submitBtn.textContent = "Sending enquiry…";
      setStatus("Sending your enquiry…");

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          form.reset();
          applyEnquiryPrefill();
          setStatus("Thanks — your enquiry has been sent. We'll be in touch.", "success");
        } else {
          // Formspree returns JSON errors (e.g. before the form ID is set up)
          setStatus(
            "We couldn't send your enquiry. Your details are still here — please try again or email us directly.",
            "error"
          );
        }
      } catch (err) {
        setStatus(
          "We couldn't connect. Your details are still here — check your connection or email us directly.",
          "error"
        );
      } finally {
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-busy");
        submitBtn.textContent = defaultButtonText;
      }
    });
  }

  /* ---- Footer year (auto-updates) ------------------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
