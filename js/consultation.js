/* =========================================================
   MOMENTUM — consultation request flow (index.html #contact)
   Three steps: consultation details → your details → review.

   Validates every required field, builds a URL-encoded WhatsApp
   message, and hands the request to Momentum through click-to-chat.
   Opening WhatsApp is not treated as proof that the message was sent.

   services.html links here with
   ?service=…&solution=…&package=…#contact. The matching
   service option is pre-selected and the package is kept in
   hidden fields, so Service Explorer visitors never have to
   choose them again.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("consultation-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const WHATSAPP_NUMBER = "255769665240";

  const panels = Array.from(form.querySelectorAll(".consult-panel"));
  const indicators = Array.from(form.querySelectorAll("[data-step-indicator]"));
  const stepCount = panels.length;
  let currentStep = 1;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  const scrollBehavior = () => (prefersReducedMotion.matches ? "auto" : "smooth");

  const fieldValue = (id) => document.getElementById(id)?.value.trim() || "";

  /* ---- Service Explorer prefill --------------------------
     Former top-level services now live under Marketing &
     Advertising. Old enquiry links keep working: the service is
     remapped while solution and package are preserved as-is. */

  const serviceField = document.getElementById("service");
  const solutionField = document.getElementById("selected-solution");
  const packageField = document.getElementById("selected-package");
  const enquiryContext = document.getElementById("enquiry-context");
  const enquiryContextValue = document.getElementById("enquiry-context-value");
  const params = new URLSearchParams(window.location.search);

  const legacyServiceMap = {
    "brand identity": "Marketing & Advertising",
    "paid advertising": "Marketing & Advertising",
    "content production": "Marketing & Advertising",
  };

  const applyEnquiryPrefill = () => {
    const requested = params.get("service")?.trim() || "";
    const service = legacyServiceMap[requested.toLowerCase()] || requested;
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

  /* ---- Accessible inline validation ---------------------
     The form uses novalidate so validation is presented next to
     each field instead of relying on temporary browser bubbles. */

  const fieldErrorMessage = (field) => {
    if (field.validity.valueMissing) {
      const requiredMessages = {
        name: "Please enter your full name.",
        email: "Please enter your email address.",
        phone: "Please enter your phone or WhatsApp number.",
        service: "Please select a service.",
        message: "Please describe your project.",
      };
      return requiredMessages[field.name] || "Please complete this field.";
    }
    if (field.validity.typeMismatch && field.type === "email") {
      return "Please enter a valid email address.";
    }
    return field.validationMessage || "Please check this field.";
  };

  const setFieldError = (field) => {
    const errorId = `${field.id || field.name}-error`;
    let error = document.getElementById(errorId);
    if (!error) {
      error = document.createElement("p");
      error.id = errorId;
      error.className = "field-error";
      error.setAttribute("role", "alert");
      field.insertAdjacentElement("afterend", error);
    }
    error.textContent = fieldErrorMessage(field);

    field.setAttribute("aria-invalid", "true");
    const describedBy = new Set(
      (field.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter(Boolean)
    );
    describedBy.add(errorId);
    field.setAttribute("aria-describedby", [...describedBy].join(" "));
  };

  const clearFieldError = (field) => {
    const errorId = `${field.id || field.name}-error`;
    document.getElementById(errorId)?.remove();

    field.removeAttribute("aria-invalid");
    const describedBy = (field.getAttribute("aria-describedby") || "")
      .split(/\s+/)
      .filter((id) => id && id !== errorId);
    if (describedBy.length) {
      field.setAttribute("aria-describedby", describedBy.join(" "));
    } else {
      field.removeAttribute("aria-describedby");
    }
  };

  form.addEventListener("input", (event) => clearFieldError(event.target));
  form.addEventListener("change", (event) => clearFieldError(event.target));

  /* ---- Step navigation ---- */

  const panelFor = (step) =>
    panels.find((panel) => Number(panel.dataset.step) === step);

  const validateStep = (step) => {
    const fields = panelFor(step).querySelectorAll("input, select, textarea");
    let firstInvalid = null;
    const requiredTextMessages = {
      name: "Please enter your full name.",
      email: "Please enter your email address.",
      phone: "Please enter your phone or WhatsApp number.",
      message: "Please describe your project.",
    };

    for (const field of fields) {
      if (field.name in requiredTextMessages) {
        field.setCustomValidity(
          field.value.trim() ? "" : requiredTextMessages[field.name]
        );
      }

      if (!field.checkValidity()) {
        setFieldError(field);
        firstInvalid ||= field;
      } else {
        clearFieldError(field);
      }
    }

    firstInvalid?.focus({ preventScroll: false });
    return !firstInvalid;
  };

  const fillReview = () => {
    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    setText("review-name", fieldValue("name") || "—");
    setText("review-email", fieldValue("email") || "—");
    setText("review-phone", fieldValue("phone") || "—");

    const business = fieldValue("business");
    document.getElementById("review-business-row").hidden = !business;
    if (business) setText("review-business", business);

    setText("review-service", serviceField.value || "—");

    const pkg = packageField.value || solutionField.value;
    document.getElementById("review-package-row").hidden = !pkg;
    if (pkg) setText("review-package", pkg);

    setText("review-summary", fieldValue("message") || "—");
  };

  const showStep = (step, focus = true) => {
    currentStep = step;
    panels.forEach((panel) => {
      panel.hidden = Number(panel.dataset.step) !== step;
    });
    indicators.forEach((indicator) => {
      const n = Number(indicator.dataset.stepIndicator);
      indicator.classList.toggle("is-active", n === step);
      indicator.classList.toggle("is-done", n < step);
      indicator.disabled = n >= step; /* only completed steps are shortcuts */
      if (n === step) {
        indicator.setAttribute("aria-current", "step");
      } else {
        indicator.removeAttribute("aria-current");
      }
    });
    if (step === stepCount) fillReview();
    if (focus) {
      form.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
      const title = panelFor(step).querySelector(".consult-panel-title");
      title.setAttribute("tabindex", "-1");
      title.focus({ preventScroll: true });
    }
  };

  form.addEventListener("click", (event) => {
    const next = event.target.closest("[data-step-next]");
    const back = event.target.closest("[data-step-back]");
    const edit = event.target.closest("[data-edit-step]");
    const indicator = event.target.closest("[data-step-indicator]");

    if (next && validateStep(currentStep)) {
      showStep(Math.min(currentStep + 1, stepCount));
    } else if (back) {
      showStep(Math.max(currentStep - 1, 1));
    } else if (edit) {
      showStep(Number(edit.dataset.editStep));
    } else if (indicator && !indicator.disabled) {
      showStep(Number(indicator.dataset.stepIndicator));
    }
  });

  showStep(1, false);

  /* ---- WhatsApp handoff ---------------------------------
     All work remains synchronous inside the user's submit action,
     which keeps the new-tab navigation reliable on desktop and mobile. */

  const setStatus = (message) => {
    status.textContent = message;
  };

  const buildWhatsAppMessage = () => {
    const details = [
      ["Name", fieldValue("name")],
      ["Email", fieldValue("email")],
      ["Phone / WhatsApp", fieldValue("phone")],
      ["Business / Organization", fieldValue("business")],
      ["Service", serviceField.value.trim()],
      ["Selected Package", packageField.value.trim() || solutionField.value.trim()],
      ["Project Details", fieldValue("message")],
      ["Consultation Fee", "TZS 100,000"],
    ].filter(([, value]) => value);

    const detailLines = details.flatMap(([label, value]) => [
      `${label}:`,
      value,
      "",
    ]);

    return [
      "Hello Momentum,",
      "",
      "I would like to request a consultation.",
      "",
      ...detailLines,
      "Please review my request and get back to me with the next steps and payment instructions.",
      "",
      "Thank you.",
    ].join("\n");
  };

  const openWhatsApp = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.hidden = true;
    document.body.append(link);
    link.click();
    link.remove();
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    setStatus("");

    /* Safety net: if any step's field is invalid, jump back to it. */
    for (let step = 1; step <= stepCount; step += 1) {
      const invalid = Array.from(
        panelFor(step).querySelectorAll("input, select, textarea")
      ).some((field) => !field.checkValidity());
      if (invalid) {
        showStep(step);
        validateStep(step);
        return;
      }
    }

    const message = buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setStatus(
      "WhatsApp has opened with your request details. Review the message and tap Send. Momentum will get back to you with the next steps."
    );
    openWhatsApp(whatsappUrl);
  });
});
