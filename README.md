# Momentum — Landing Page

A single-page marketing site for **Momentum**, a marketing and technology studio.
Built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step.

## File structure

```
momentum-page/
├── index.html        # All page markup (hero, services, about, contact, footer)
├── css/
│   └── styles.css    # All styling. Branding lives in the :root CSS variables.
├── js/
│   └── main.js       # Scroll fade-ins, mobile menu, contact-form handling
├── assets/           # Logo, favicon, and images go here
└── README.md         # This file
```

Everything is intentionally separated by concern so it's easy to learn from:
**structure** (HTML) / **style** (CSS) / **behaviour** (JS).

## Run locally

No build tools are needed, but the site must be served over HTTP. From the
project directory, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Opening `index.html` directly with a `file://` URL is not a supported local
development method. The hero uses the production-safe root-relative video path
`/videos/city.mp4`, which resolves against an HTTP site's origin and will not
reliably resolve when the page is opened directly from the filesystem.

## Deploy

It's a static site, so host it anywhere: **GitHub Pages**, **Netlify**, **Vercel**,
**Cloudflare Pages**, or any web host — just upload the folder. No server required.

## Customising the brand

All colours and fonts are CSS variables in the `:root` block at the top of
[`css/styles.css`](css/styles.css). Change them once and the whole site updates:

| Variable            | Purpose                    | Current   |
| ------------------- | -------------------------- | --------- |
| `--color-bg`        | Page background            | `#ffffff` |
| `--color-text`      | Body text                  | `#1a1a1a` |
| `--color-accent`    | Buttons / strong accents   | `#000000` |
| `--color-divider-1` | Lightest dividers / fills  | `#f5f5f5` |
| `--color-divider-2` | Slightly stronger lines    | `#e5e5e5` |
| `--font-sans`       | Typeface (Inter by default) | —        |

## Things to fill in before going live

- **Logo** — search `LOGO PLACEHOLDER` in `index.html` and drop in the final asset.
- **Instagram handle** — WhatsApp, phone, and email are set to real details.
  Instagram is still a placeholder (`@momentum`); search `INSTAGRAM` in
  `index.html` (contact section + footer) and swap in the real handle.
- **Formspree form ID** — the contact form POSTs to Formspree but needs your
  form ID. Search `PASTE YOUR FORMSPREE ID HERE` in `index.html`, create a free
  form at <https://formspree.io>, and replace `YOUR_FORM_ID` in the form's
  `action`. Until then, submissions will show an error message.
- **Copy** — the tagline and About text are placeholder copy; edit to taste.
