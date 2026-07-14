/* =========================================================
   MOMENTUM — shared global navigation
   One component owns the navbar markup, responsive menu,
   sticky scroll treatment, and URL-derived active state.
   ========================================================= */

(() => {
  const navItems = [
    { key: "home", label: "Home", href: "index.html" },
    { key: "services", label: "Services", href: "services.html" },
    { key: "about", label: "About", href: "index.html#about" },
    { key: "contact", label: "Contact", href: "index.html#contact" },
  ];

  class MomentumNavigation extends HTMLElement {
    static activeKeyFor(href) {
      const currentUrl = new URL(href);
      const normalizedPath = currentUrl.pathname.endsWith("/")
        ? `${currentUrl.pathname}index.html`
        : currentUrl.pathname;

      const sectionMatch = navItems.find(({ href: itemHref }) => {
        const targetUrl = new URL(itemHref, currentUrl);
        return (
          targetUrl.hash &&
          targetUrl.pathname === normalizedPath &&
          targetUrl.hash === currentUrl.hash
        );
      });

      const fileName = normalizedPath.split("/").pop() || "index.html";
      const pageKey = fileName.replace(/\.html?$/i, "").toLowerCase();
      return sectionMatch?.key || (pageKey === "index" ? "home" : pageKey);
    }

    connectedCallback() {
      if (this.dataset.ready === "true") return;
      this.dataset.ready = "true";

      const links = navItems
        .map(
          ({ key, label, href }) =>
            `<li><a href="${href}" data-nav-key="${key}">${label}</a></li>`
        )
        .join("");

      this.innerHTML = `
        <header class="site-header">
          <div class="container header-inner">
            <a href="index.html" class="brand" aria-label="Momentum home">
              <img src="photos/trajectory-mono-light.png" alt="Momentum logo" class="brand-logo" />
              <span class="brand-name">Momentum</span>
            </a>

            <nav class="nav" aria-label="Primary">
              <button
                class="nav-toggle"
                aria-expanded="false"
                aria-controls="nav-links"
                aria-label="Toggle menu"
              >
                <span></span><span></span><span></span>
              </button>
              <ul class="nav-links" id="nav-links">
                ${links}
                <li class="nav-cta-mobile">
                  <a href="index.html#contact" class="btn btn-sm">Get in touch</a>
                </li>
              </ul>
            </nav>

            <a href="index.html#contact" class="btn btn-sm header-cta">Get in touch</a>
          </div>
        </header>
      `;

      this.header = this.querySelector(".site-header");
      this.nav = this.querySelector(".nav");
      this.toggle = this.querySelector(".nav-toggle");
      this.links = [...this.querySelectorAll("[data-nav-key]")];

      this.syncActiveState = this.syncActiveState.bind(this);
      this.syncScrollState = this.syncScrollState.bind(this);
      this.closeMenu = this.closeMenu.bind(this);

      this.toggle.addEventListener("click", () => {
        const open = this.nav.classList.toggle("nav-open");
        this.toggle.setAttribute("aria-expanded", String(open));
      });

      this.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", this.closeMenu);
      });

      this.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          this.closeMenu();
          this.toggle.focus();
        }
      });

      window.addEventListener("hashchange", this.syncActiveState);
      window.addEventListener("popstate", this.syncActiveState);
      window.addEventListener("scroll", this.syncScrollState, { passive: true });

      this.syncActiveState();
      this.syncScrollState();
    }

    disconnectedCallback() {
      window.removeEventListener("hashchange", this.syncActiveState);
      window.removeEventListener("popstate", this.syncActiveState);
      window.removeEventListener("scroll", this.syncScrollState);
    }

    closeMenu() {
      this.nav.classList.remove("nav-open");
      this.toggle.setAttribute("aria-expanded", "false");
    }

    syncScrollState() {
      this.header.classList.toggle("is-scrolled", window.scrollY > 8);
    }

    syncActiveState() {
      const activeKey = MomentumNavigation.activeKeyFor(window.location.href);

      this.links.forEach((link) => {
        if (link.dataset.navKey === activeKey) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }
  }

  if (!customElements.get("momentum-navigation")) {
    customElements.define("momentum-navigation", MomentumNavigation);
  }
})();
