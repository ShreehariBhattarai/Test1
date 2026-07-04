# shreehari.bi — shreeharibhattarai.com.np

A static Microsoft Fabric / Power BI authority site for Shreehari Bhattarai. Plain HTML5, CSS, and vanilla JavaScript — no build step, no framework, no backend.

## Status

This is **phase one** of the full build described in the master prompt. It establishes the design system, information architecture, and the core pages, plus three complete sample blog posts that define the content template. Not yet built: the remaining ~47 blog articles, full tutorial curricula, dashboard gallery, case studies, and downloadable resources — these are structured as clearly-marked "in progress" pages so no links break, ready to be filled in incrementally.

## Folder structure

```
/
├── index.html                  Homepage
├── about.html                  About page
├── blog.html                   Blog listing (client-side search + filter)
├── contact.html                Contact page
├── robots.txt
├── sitemap.xml
├── rss.xml
├── assets/
│   ├── css/
│   │   ├── tokens.css          Design tokens (colors, type, spacing)
│   │   ├── base.css            Reset + base element styles
│   │   ├── components.css      Nav, buttons, cards, timeline, footer
│   │   ├── home.css            Homepage hero + pipeline signature
│   │   ├── inner.css           Shared inner-page layout (headers, forms)
│   │   └── post.css            Blog article layout, code blocks, TOC
│   ├── js/main.js              Nav toggle, scroll reveal, counters, TOC spy
│   ├── icons/favicon.svg
│   └── images/                 (add photos, OG image here)
├── blog/                       Individual article pages
├── tutorials/                  Learning paths + certifications/ subfolder
├── resources/                  Free downloads landing page
├── downloads/                  (place PBIX/PDF files here as added)
├── data/                       (reserved for future post metadata/JSON)
└── .github/workflows/deploy.yml
```

## Design system

"Fabric Dark" — charcoal background (`#0a0e14`), electric violet (`#8457ff`) and cyan (`#22d3ee`) as the primary Fabric-inspired gradient, with Power BI's brand yellow (`#f2c811`) as a tertiary accent. Typography: Space Grotesk (display), Inter (body), JetBrains Mono (data/code — used deliberately throughout for stats, timeline dates, and badges to reinforce the data-engineering identity). All tokens live in `assets/css/tokens.css` — change the palette there and it propagates everywhere.

The homepage's signature element is an animated Fabric pipeline diagram (Source → Data Factory → OneLake → Lakehouse → Semantic Model → Power BI) with a traveling pulse, rather than a generic hero graphic — it's meant to double as a one-glance architecture explainer.

## Deployment

**Option A — Cloudflare Pages (recommended, matches the domain's DNS)**
1. Push this repo to GitHub.
2. In the Cloudflare dashboard: Workers & Pages → Create → Pages → Connect to Git → select the repo.
3. Build command: none. Build output directory: `/` (root).
4. Add custom domain `shreeharibhattarai.com.np` under the Pages project's custom domains tab; Cloudflare will handle DNS if the domain is already on Cloudflare.
5. Optional: use the included `.github/workflows/deploy.yml` instead of Cloudflare's built-in Git integration if you want deploys triggered from Actions — add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as repo secrets first.

**Option B — GitHub Pages**
1. Push to GitHub, then in Settings → Pages, set source to the `main` branch, root folder.
2. Point the `shreeharibhattarai.com.np` DNS `CNAME`/`A` records at GitHub Pages per GitHub's custom domain docs, and add a `CNAME` file at the repo root containing `shreeharibhattarai.com.np`.

Either host works from the same repo since there's no server-side code.

## Adding a new blog post

1. Copy `blog/pl-300-exam-guide.html` as a starting template — it has the full pattern: SEO meta, Open Graph, `TechArticle` + `BreadcrumbList` (+`FAQPage` where relevant) JSON-LD, TOC with scroll-spy, code blocks with copy buttons, FAQ accordion, related posts, and author box.
2. Update all metadata (title, description, canonical URL, JSON-LD dates/headline).
3. Add a card for it to `blog.html`'s `#post-grid`, with the correct `data-category` for filtering.
4. Add its URL to `sitemap.xml` and a new `<item>` to `rss.xml`.
5. Keep quotes/paraphrasing in mind if referencing external documentation — write in your own words.

Target length per the original brief is 2,500+ words for full authority-building articles; the three sample posts are shorter reference implementations of the template, not the final target length.

## Maintenance checklist

- Update `dateModified` in JSON-LD whenever a post is substantively edited.
- Re-run a link check after adding pages (no automated linter is wired up yet — a simple approach is `grep -r "href=\"" . | grep -v http` to review internal links).
- Keep `sitemap.xml` and `rss.xml` in sync with new content; nothing auto-generates them at build time since there's no build step.
- Replace the placeholder résumé path (`assets/resume/Shreehari-Bhattarai-Resume.pdf`) with an actual file, or remove the download CTA until it exists.
- The contact form has no backend — either wire it to a service like Formspree, or replace it with a `mailto:` link if a backend isn't a near-term priority.

## Next phases (not yet built)

- Remaining blog articles (Lakehouse, Warehouse, OneLake, Data Factory, Notebooks, Dataflow Gen2, capacity planning, incremental refresh, RLS, calculation groups, star schema, deployment pipelines, etc.)
- Full tutorial curricula with modules, exercises, quizzes, and downloadable PDFs
- Dashboard gallery / case studies section
- Downloadable resource files (PBIX templates, cheat sheets, architecture PDF)
- Newsletter signup wiring (Mailchimp/ConvertKit)
- Real professional photo and OG cover image in `assets/images/`
