# Sagar Hossen — Portfolio Website

A premium, single-page freelance portfolio site for Sagar Hossen (Digital Marketer & Web Developer), built with plain HTML, CSS, and vanilla JavaScript — no build step, no frameworks, no dependencies beyond Google Fonts.

## What's inside

```
site/
├── index.html          All page content and structure
├── css/
│   └── style.css       Design system, layout, responsive rules
├── js/
│   └── script.js       Nav, mobile menu, scroll reveals, portfolio filter, lightbox
└── assets/
    ├── logo/           Navbar/footer logo (transparent PNG)
    └── img/            Home background, portrait, and 20 portfolio images
```

Sections: Home, About, Services (4 cards), Portfolio (4 category previews with a 5-image lightbox gallery each), Process, Contact, plus a sticky nav and footer.

## Running it locally

No build tools needed. Either:

- Double-click `index.html` to open it directly in a browser, or
- Serve it locally (recommended, avoids any local file-security quirks):
  ```bash
  cd site
  python3 -m http.server 8080
  ```
  then open `http://localhost:8080`.

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Push the contents of this `site/` folder to the repository — `index.html` should sit at the **root** of the repo (or in `/docs` if you prefer that setup).
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Pick the branch (usually `main`) and the folder (`/root` or `/docs`, matching step 2), then **Save**.
6. GitHub will give you a live URL (typically `https://<username>.github.io/<repo-name>/`) within a minute or two.

That's it — no build step, no environment variables, no server required.

## Editing content later

- **Text:** all copy lives directly in `index.html`, organized by section with comments (`<!-- ============ ABOUT ============ -->` etc.).
- **Colors/fonts/spacing:** all design tokens are defined once at the top of `css/style.css` under `:root` — change a value there and it updates everywhere.
- **Logo:** `assets/logo/logo-navbar.png`, referenced in both the nav and footer. Swap the file (keep the same name) to update it everywhere at once.
- **Portfolio:** each of the 4 category cards in `index.html` (`.portfolio-feature-card`) shows one cover image; the full 5-image set per category lives in the `portfolioData` object near the top of the lightbox section in `js/script.js` — edit the `images` array there to add, remove, or reorder gallery photos without touching the HTML.
- **Contact links:** the email and WhatsApp links appear in a few places (nav, hero, Contact, footer) — search for `mailto:sagarh.online@gmail.com` and `wa.me/60177403840` in `index.html` if either ever changes.

## Notes

- Fonts (Space Grotesk, Inter, JetBrains Mono) load from Google Fonts via CDN — an internet connection is needed for them to render; the site falls back to system sans-serif fonts otherwise.
- All images were optimized (resized + compressed) from your original uploads for fast loading.
- Tested across desktop, tablet, and mobile widths with no horizontal overflow, and checked for console/JS errors, broken links, and working navigation, filtering, and lightbox interactions.
