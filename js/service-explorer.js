/* =========================================================
   MOMENTUM — Service Explorer (services.html)
   Renders three interactive levels from MOMENTUM_SERVICES
   (js/services-data.js):
   1. Service category tabs
   2. Solution tabs for the active category
   3. Details panel for the active solution
   Plus the contextual FAQ section for the active category.

   Selecting a category always auto-selects its first
   solution, so the details panel can never show a solution
   from a different service. No page reloads — everything
   swaps in place.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("explorer-root");
  if (!root || typeof MOMENTUM_SERVICES === "undefined") return;

  const faqSection = document.getElementById("faq");
  const faqRoot = document.getElementById("faq-root");

  /* Same number as the contact links on index.html. */
  const WHATSAPP_NUMBER = "255769665240";

  const esc = (value) =>
    String(value).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[ch]);

  const whatsappLink = (text) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  /* Links to the contact form on the homepage. js/main.js reads
     these query parameters and prefills the message field. */
  const enquiryLink = (category, solution, packageName) => {
    const params = new URLSearchParams({ service: category.name });
    if (solution) params.set("solution", solution.name);
    if (packageName) params.set("package", packageName);
    return `index.html?${params.toString()}#contact`;
  };

  /* ---- Details panel templates ---------------------------
     Reading order inside a package: name → description →
     summary strip → CTAs → who it's for → deliverables →
     project/payment facts → secondary accordions. */

  /* Sections with no data are omitted entirely so every package
     renders the same ordered layout without empty placeholders. */
  const completeDetails = (category, solution) => `
    <header class="package-header">
      <h4 class="package-name">${esc(solution.packageName)}</h4>
      <p class="package-desc">${esc(solution.description)}</p>
    </header>

    ${
      (solution.highlights || []).length
        ? `
    <dl class="package-highlights">
      ${solution.highlights
        .map(
          (item) => `
      <div class="package-highlight">
        <dt>${esc(item.label)}</dt>
        <dd>${esc(item.value)}</dd>
      </div>`
        )
        .join("")}
    </dl>`
        : ""
    }

    <div class="package-cta">
      <a class="btn btn-lg" href="${enquiryLink(category, solution, solution.packageName)}">Request This Package</a>
      <a
        class="btn btn-outline"
        href="${whatsappLink(`Hello Momentum, I'd like to talk about the ${solution.packageName} (${category.name} — ${solution.name}).`)}"
        target="_blank"
        rel="noopener"
      >Talk to Momentum</a>
    </div>

    ${
      (solution.bestFor || []).length
        ? `
    <div class="package-group">
      <h5 class="package-group-title">Best suited for</h5>
      <ul class="package-tags">
        ${solution.bestFor.map((item) => `<li>${esc(item)}</li>`).join("")}
      </ul>
    </div>`
        : ""
    }

    ${
      (solution.included || []).length
        ? `
    <div class="package-group">
      <h5 class="package-group-title">Included deliverables</h5>
      <div class="package-deliverables">
        ${solution.included
          .map(
            (group) => `
        <div class="deliverable-group">
          <h6>${esc(group.title)}</h6>
          <ul class="package-list package-list-single">
            ${group.items.map((item) => `<li>${esc(item)}</li>`).join("")}
          </ul>
        </div>`
          )
          .join("")}
      </div>
    </div>`
        : ""
    }

    ${
      (solution.paymentTerms || []).length || solution.timelineNote
        ? `
    <dl class="package-facts">
      ${
        solution.timelineNote
          ? `
      <div class="package-fact">
        <dt>Project start</dt>
        <dd class="package-fact-note">${esc(solution.timelineNote)}</dd>
      </div>`
          : ""
      }
      ${
        (solution.paymentTerms || []).length
          ? `
      <div class="package-fact">
        <dt>Payment terms</dt>
        ${solution.paymentTerms.map((line) => `<dd>${esc(line)}</dd>`).join("")}
      </div>`
          : ""
      }
    </dl>`
        : ""
    }

    ${
      (solution.exclusions || []).length
        ? `
    <details class="accordion">
      <summary>What's not included</summary>
      <ul class="package-list package-list-muted">
        ${solution.exclusions.map((item) => `<li>${esc(item)}</li>`).join("")}
      </ul>
    </details>`
        : ""
    }

    ${
      (solution.addOns || []).length
        ? `
    <details class="accordion">
      <summary>Optional add-ons</summary>
      <ul class="package-addons">
        ${solution.addOns
          .map(
            (addOn) =>
              `<li><span>${esc(addOn.name)}</span><span class="addon-price">${esc(addOn.price)}</span></li>`
          )
          .join("")}
      </ul>
    </details>`
        : ""
    }`;

  const quotationDetails = (category, solution) => `
    <header class="package-header">
      <p class="package-soon">Tailored quotation</p>
      <h4 class="package-name">${esc(solution.name)}</h4>
      <p class="package-desc">
        Package details are currently being prepared. Contact Momentum for a
        tailored quotation.
      </p>
    </header>
    <div class="package-cta">
      <a class="btn btn-lg" href="${enquiryLink(category, solution)}">Request a Quotation</a>
      <a
        class="btn btn-outline"
        href="${whatsappLink(`Hello Momentum, I'd like a quotation for ${category.name} — ${solution.name}.`)}"
        target="_blank"
        rel="noopener"
      >Talk to Momentum</a>
    </div>`;

  /* ---- Tablist helper: click + arrow-key navigation ------- */

  const initTablist = (tablist, onSelect) => {
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const select = (index, focus) => {
      tabs.forEach((tab, i) => {
        const active = i === index;
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
      });
      if (focus) tabs[index].focus();
      tabs[index].scrollIntoView({
        behavior: prefersReducedMotion.matches ? "auto" : "smooth",
        block: "nearest",
        inline: "nearest",
      });
      onSelect(index);
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => select(index));
      tab.addEventListener("keydown", (event) => {
        let next = null;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          next = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          next = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          next = 0;
        } else if (event.key === "End") {
          next = tabs.length - 1;
        }
        if (next === null) return;
        event.preventDefault();
        select(next, true);
      });
    });
  };

  /* ---- Render ---------------------------------------------
     The category tabs are built once; the shared panel below
     them is re-rendered when the category or solution changes. */

  /* Re-triggers the subtle swap-in transition on re-rendered content. */
  const animateSwap = (el) => {
    el.classList.remove("is-swapping");
    void el.offsetWidth; /* restart the animation */
    el.classList.add("is-swapping");
  };

  /* Small secondary label under each solution name. Derived from
     the package data — never invented copy. */
  const solutionSub = (solution) =>
    solution.availability === "complete" && solution.startingPrice
      ? solution.startingPrice.replace(/^Starting from\s+/i, "From ")
      : "Tailored quotation";

  root.innerHTML = `
    <div class="category-tabs" role="tablist" aria-label="Service categories">
      ${MOMENTUM_SERVICES.map(
        (category, index) => `
      <button
        class="category-tab"
        type="button"
        role="tab"
        id="category-tab-${esc(category.id)}"
        data-label="${esc(category.name)}"
        aria-controls="explorer-panel"
        aria-selected="${index === 0 ? "true" : "false"}"
        tabindex="${index === 0 ? "0" : "-1"}"
      >${esc(category.name)}</button>`
      ).join("")}
    </div>
    <div
      class="explorer-body"
      role="tabpanel"
      id="explorer-panel"
      tabindex="0"
      aria-labelledby="category-tab-${esc(MOMENTUM_SERVICES[0].id)}"
    ></div>`;

  const panel = document.getElementById("explorer-panel");

  const renderSolution = (category, solution) => {
    const details = document.getElementById("solution-panel");
    details.setAttribute("aria-labelledby", `solution-tab-${solution.id}`);
    details.innerHTML =
      solution.availability === "complete"
        ? completeDetails(category, solution)
        : quotationDetails(category, solution);
    animateSwap(details);
  };

  const renderFaqs = (category) => {
    if (!faqSection || !faqRoot) return;
    const faqs = category.faqs || [];
    faqSection.hidden = faqs.length === 0;
    faqRoot.innerHTML = faqs
      .map(
        (faq) => `
      <details class="accordion">
        <summary>${esc(faq.question)}</summary>
        <p class="accordion-text">${esc(faq.answer)}</p>
      </details>`
      )
      .join("");
  };

  const renderCategory = (category) => {
    panel.setAttribute("aria-labelledby", `category-tab-${category.id}`);
    panel.innerHTML = `
      <div class="explorer-intro">
        <h3 class="explorer-service-name">${esc(category.name)}</h3>
        <p class="explorer-service-desc">${esc(category.description)}</p>
      </div>
      <div class="explorer-grid">
        <div
          class="explorer-solutions"
          role="tablist"
          aria-orientation="vertical"
          aria-label="${esc(category.name)} solutions"
        >
          ${category.solutions
            .map(
              (solution, index) => `
          <button
            class="solution-tab"
            type="button"
            role="tab"
            id="solution-tab-${esc(solution.id)}"
            aria-controls="solution-panel"
            aria-selected="${index === 0 ? "true" : "false"}"
            tabindex="${index === 0 ? "0" : "-1"}"
          >
            <span class="solution-tab-name">${esc(solution.name)}</span>
            <span class="solution-tab-sub">${esc(solutionSub(solution))}</span>
          </button>`
            )
            .join("")}
        </div>
        <div class="package-panel" role="tabpanel" id="solution-panel" tabindex="0"></div>
      </div>`;

    initTablist(panel.querySelector(".explorer-solutions"), (index) =>
      renderSolution(category, category.solutions[index])
    );

    /* A new category always starts on its first solution. */
    renderSolution(category, category.solutions[0]);
    renderFaqs(category);
    animateSwap(panel);
  };

  initTablist(root.querySelector(".category-tabs"), (index) =>
    renderCategory(MOMENTUM_SERVICES[index])
  );
  renderCategory(MOMENTUM_SERVICES[0]);
});
