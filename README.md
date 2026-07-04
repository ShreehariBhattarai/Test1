# shreeharibhattarai.com.np — Site Package

## File structure

```
/
├── index.html          → Homepage
├── blog.html           → Article listing
├── about.html          → About + contact
├── robots.txt          → SEO: crawler instructions
├── sitemap.xml         → SEO: page index for Google
├── css/
│   └── styles.css      → All styles (design tokens, layout, components)
├── js/
│   └── main.js         → Mobile nav, subscribe form
└── blog/
    ├── direct-lake-fallback-guide.html   ← featured post (full template)
    ├── dax-context-transition.html
    ├── pl300-dp600-study-path.html
    ├── power-query-folding.html
    ├── capacity-sizing-fabric.html
    └── semantic-model-design.html
```

## Deploying to shared hosting

1. Upload the entire contents of this folder (not the folder itself) to your
   `public_html` (or `www`) root via cPanel File Manager or FTP.
2. Point your domain (shreeharibhattarai.com.np) to that directory — usually
   already the default on shared hosts.
3. Replace `<div class="about-photo">photo placeholder...</div>` in
   `index.html` and `about.html` with an `<img>` tag pointing to your
   uploaded `/images/profile.jpg`.

## Adding a new blog post

1. Copy `blog/direct-lake-fallback-guide.html` → `blog/your-slug.html`
2. Update: `<title>`, `<meta name="description">`, `<link rel="canonical">`,
   `datePublished`, `date_disp`, `cat`, `read`, `h1`, body paragraphs, tags.
3. Add a card in `blog.html` (copy any `.post-card` block, update href/title/excerpt).
4. Add a card on the homepage `index.html` (replace oldest card if keeping 3 visible).
5. Add the URL to `sitemap.xml`.

## SEO checklist (do once after going live)

- [ ] Submit sitemap to Google Search Console:
      https://search.google.com/search-console → Sitemaps → add sitemap URL
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Add your domain in LinkedIn profile URL field
- [ ] Share each post on LinkedIn with a short personal take — LinkedIn traffic
      is where the Power BI audience actually is
- [ ] Add Open Graph image (1200×630px) at /images/og-cover.jpg

## Updating the measure ticker (hero strip)

Open `index.html`, find the `.measure-track` div and edit/add `.measure-item`
spans. Duplicate the full set of items so the seamless scroll loop works.

## To add email subscription backend

The subscribe form currently shows a success state client-side only.
To collect real emails, replace the form action with one of:
- Mailchimp embedded form (free tier)
- Buttondown.email (simple, developer-friendly)
- ConvertKit (free up to 1,000 subscribers)
