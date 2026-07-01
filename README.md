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

No build tools needed. Either:

- **Open directly** — double-click `index.html`, or
- **Serve it** (recommended, avoids browser file:// quirks):

  ```bash
  # Python 3
  python -m http.server 8000
  # then visit http://localhost:8000
  ```

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
- **Contact details** — replace the placeholder WhatsApp number, phone, email,
  and Instagram handle in the Contact section of `index.html`.
- **Contact form** — currently front-end only (shows a confirmation message).
  Wire it to a real endpoint (Formspree, Netlify Forms, or your own API).
  See the note in [`js/main.js`](js/main.js).
- **Copy** — the tagline and About text are placeholder copy; edit to taste.
