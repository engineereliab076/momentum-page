/* =========================================================
   MOMENTUM — consultation request flow (index.html #contact)
   Four steps: consultation details → preferred appointment →
   client information → review. Appointment options come from
   MOMENTUM_AVAILABILITY (js/availability.js).

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
  if (!form || typeof MOMENTUM_AVAILABILITY === "undefined") return;

  const cfg = MOMENTUM_AVAILABILITY;
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

  /* ---- Availability helpers ------------------------------
     All date maths run on "YYYY-MM-DD" strings anchored to the
     configured timezone, so a visitor's local clock never lets
     them pick a slot that is already in the past in EAT. */

  const eatToday = () =>
    new Intl.DateTimeFormat("en-CA", { timeZone: cfg.ianaTimezone }).format(
      new Date()
    );

  const eatNowTime = () =>
    new Intl.DateTimeFormat("en-GB", {
      timeZone: cfg.ianaTimezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());

  const addDays = (isoDate, days) => {
    const date = new Date(`${isoDate}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
  };

  const dayOfWeek = (isoDate) => new Date(`${isoDate}T00:00:00Z`).getUTCDay();

  const slotsFor = (isoDate) => {
    const blocked = cfg.blockedSlots[isoDate] || [];
    let slots = cfg.dailySlots.filter((slot) => !blocked.includes(slot));
    /* Same-day requests (possible when minNoticeDays is 0): drop
       start times that have already passed in EAT. */
    if (isoDate === eatToday()) {
      const now = eatNowTime();
      slots = slots.filter((slot) => slot > now);
    }
    return slots;
  };

  const minDate = addDays(eatToday(), cfg.minNoticeDays);
  const maxDate = addDays(eatToday(), cfg.maxAdvanceDays);

  const dateProblem = (isoDate) => {
    if (!isoDate) return "Please choose a date.";
    if (isoDate < minDate)
      return "Please choose an upcoming date — past dates can't be requested.";
    if (isoDate > maxDate)
      return `We take requests up to ${cfg.maxAdvanceDays} days ahead — please choose an earlier date.`;
    if (!cfg.workingDays.includes(dayOfWeek(isoDate)))
      return `Consultations run ${cfg.workingDaysLabel} — please choose another date.`;
    if (cfg.blockedDates.includes(isoDate))
      return "We're unavailable on this date — please choose another.";
    if (slotsFor(isoDate).length === 0)
      return "No times are left on this date — please choose another.";
    return "";
  };

  /* ---- Step 2: date + time slot fields ---- */

  const dateInput = document.getElementById("consult-date");
  const dateHint = document.getElementById("consult-date-hint");
  const timeSelect = document.getElementById("consult-time");

  dateInput.min = minDate;
  dateInput.max = maxDate;

  const defaultDateHint = `Available ${cfg.workingDaysLabel}, up to ${cfg.maxAdvanceDays} days ahead.`;

  const syncSlots = () => {
    const isoDate = dateInput.value;
    const problem = dateProblem(isoDate);
    dateInput.setCustomValidity(isoDate ? problem : "");
    dateHint.textContent = isoDate && problem ? problem : defaultDateHint;

    const previous = timeSelect.value;
    timeSelect.innerHTML = "";

    if (!isoDate || problem) {
      timeSelect.disabled = true;
      timeSelect.append(new Option("Select a date first", ""));
      return;
    }

    timeSelect.disabled = false;
    timeSelect.append(new Option("Select a time", ""));
    slotsFor(isoDate).forEach((slot) => {
      timeSelect.append(new Option(slot, slot));
    });
    if (previous) timeSelect.value = previous; /* keep the choice if still open */
  };

  dateInput.addEventListener("change", syncSlots);
  syncSlots();

  /* ---- Meeting preference --------------------------------
     The single source of truth for meeting formats. Physical
     Meeting reveals an optional location field; the venue is
     always confirmed manually by Momentum. */

  const MEETING_PREFERENCES = [
    { value: "Google Meet" },
    { value: "Phone Call" },
    { value: "WhatsApp Call" },
    { value: "Physical Meeting", needsLocation: true },
  ];

  const meetingOptionsRoot = document.getElementById("meeting-preference-options");
  const physicalFields = document.getElementById("physical-meeting-fields");
  const meetingAreaInput = document.getElementById("meeting-area");

  meetingOptionsRoot.innerHTML = MEETING_PREFERENCES.map(
    ({ value }, index) => `
    <label class="consult-choice-option">
      <input
        type="radio"
        name="meeting_preference"
        value="${value}"
        ${index === 0 ? "required" : ""}
      />
      <span>${value}</span>
    </label>`
  ).join("");

  const selectedMeeting = () =>
    form.querySelector('input[name="meeting_preference"]:checked');

  const meetingNeedsLocation = () =>
    Boolean(
      MEETING_PREFERENCES.find(
        (pref) => pref.value === selectedMeeting()?.value
      )?.needsLocation
    );

  /* The location input is disabled while hidden so it is never
     submitted for meeting formats that don't use it. */
  const syncPhysicalFields = () => {
    const show = meetingNeedsLocation();
    physicalFields.hidden = !show;
    meetingAreaInput.disabled = !show;
  };

  meetingOptionsRoot.addEventListener("change", syncPhysicalFields);
  syncPhysicalFields();

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
        preferred_date: "Please choose a preferred date.",
        preferred_time: "Please choose a preferred time.",
        meeting_preference: "Please choose a meeting preference.",
        message: "Please describe your project.",
      };
      return requiredMessages[field.name] || "Please complete this field.";
    }
    if (field.validity.typeMismatch && field.type === "email") {
      return "Please enter a valid email address.";
    }
    return field.validationMessage || "Please check this field.";
  };

  const errorTargetFor = (field) =>
    field.name === "meeting_preference"
      ? meetingOptionsRoot
      : field;

  const errorIdFor = (field) =>
    field.name === "meeting_preference"
      ? "meeting-preference-error"
      : `${field.id || field.name}-error`;

  const setFieldError = (field) => {
    const target = errorTargetFor(field);
    if (!target) return;

    const errorId = errorIdFor(field);
    let error = document.getElementById(errorId);
    if (!error) {
      error = document.createElement("p");
      error.id = errorId;
      error.className = "field-error";
      error.setAttribute("role", "alert");
      target.insertAdjacentElement("afterend", error);
    }
    error.textContent = fieldErrorMessage(field);

    const relatedFields =
      field.name === "meeting_preference"
        ? form.querySelectorAll('input[name="meeting_preference"]')
        : [field];
    relatedFields.forEach((relatedField) => {
      relatedField.setAttribute("aria-invalid", "true");
      const describedBy = new Set(
        (relatedField.getAttribute("aria-describedby") || "")
          .split(/\s+/)
          .filter(Boolean)
      );
      describedBy.add(errorId);
      relatedField.setAttribute("aria-describedby", [...describedBy].join(" "));
    });
  };

  const clearFieldError = (field) => {
    const errorId = errorIdFor(field);
    document.getElementById(errorId)?.remove();

    const relatedFields =
      field.name === "meeting_preference"
        ? form.querySelectorAll('input[name="meeting_preference"]')
        : [field];
    relatedFields.forEach((relatedField) => {
      relatedField.removeAttribute("aria-invalid");
      const describedBy = (relatedField.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter((id) => id && id !== errorId);
      if (describedBy.length) {
        relatedField.setAttribute("aria-describedby", describedBy.join(" "));
      } else {
        relatedField.removeAttribute("aria-describedby");
      }
    });
  };

  form.addEventListener("input", (event) => clearFieldError(event.target));
  form.addEventListener("change", (event) => clearFieldError(event.target));

  /* ---- Step navigation ---- */

  const panelFor = (step) =>
    panels.find((panel) => Number(panel.dataset.step) === step);

  const validateStep = (step) => {
    const fields = panelFor(step).querySelectorAll("input, select, textarea");
    let firstInvalid = null;
    const validatedRadioGroups = new Set();
    const requiredTextMessages = {
      name: "Please enter your full name.",
      email: "Please enter your email address.",
      phone: "Please enter your phone or WhatsApp number.",
      message: "Please describe your project.",
    };

    for (const field of fields) {
      if (field.type === "radio") {
        if (validatedRadioGroups.has(field.name)) continue;
        validatedRadioGroups.add(field.name);
      }

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

  const formatReviewDate = (isoDate) =>
    isoDate
      ? new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        })
      : "—";

  const fillReview = () => {
    document.getElementById("review-date").textContent = formatReviewDate(
      dateInput.value
    );
    document.getElementById("review-time").textContent =
      timeSelect.value || "—";
    document.getElementById("review-meeting").textContent =
      selectedMeeting()?.value || "—";

    /* Meeting area appears only for a physical meeting with an area given */
    const area = meetingNeedsLocation() ? meetingAreaInput.value.trim() : "";
    const locationRow = document.getElementById("review-location-row");
    locationRow.hidden = !area;
    if (area) document.getElementById("review-location").textContent = area;
    document.getElementById("review-service").textContent =
      serviceField.value || "—";
    document.getElementById("review-summary").textContent =
      document.getElementById("message").value.trim() || "—";

    const pkg = packageField.value || solutionField.value;
    const packageRow = document.getElementById("review-package-row");
    packageRow.hidden = !pkg;
    if (pkg) document.getElementById("review-package").textContent = pkg;
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

  const fieldValue = (id) => document.getElementById(id)?.value.trim() || "";

  const buildWhatsAppMessage = () => {
    const details = [
      ["Name", fieldValue("name")],
      ["Email", fieldValue("email")],
      ["Phone / WhatsApp", fieldValue("phone")],
      ["Business / Organization", fieldValue("business")],
      ["Service", serviceField.value.trim()],
      ["Selected Solution", solutionField.value.trim()],
      ["Selected Package", packageField.value.trim()],
      ["Preferred Date", formatReviewDate(dateInput.value)],
      ["Preferred Time", timeSelect.value.trim()],
      ["Timezone", "East Africa Time (UTC+3)"],
      ["Meeting Preference", selectedMeeting()?.value || ""],
      [
        "Preferred Meeting Area",
        meetingNeedsLocation() ? meetingAreaInput.value.trim() : "",
      ],
      ["Project Details", fieldValue("message")],
      ["Consultation Fee", "TZS 100,000"],
    ].filter(([, value]) => value && value !== "—");

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
      "Please review my preferred appointment and send payment instructions if the time is available.",
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

    /* Safety net: if any step's field is invalid (e.g. availability
       changed underneath a chosen slot), jump back to that step. */
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
      "WhatsApp has been opened with your consultation details. Review the message and tap Send to complete your request."
    );
    openWhatsApp(whatsappUrl);
  });
});
