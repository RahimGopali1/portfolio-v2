# My Portfolio — Rahim Gopali

A personal portfolio and résumé website for a web developer, built with Angular 19 and server-side rendering. It presents professional projects, an interactive résumé with a downloadable PDF, and a working contact form.

## Highlights

- **Server-side rendering (SSR)** with prerendered routes and client hydration + event replay, so pages arrive as fully rendered HTML for fast first paint and good SEO.
- **Static prerendering of project case studies** — every `/portfolio/:slug` route is prerendered at build time from a single data source, producing one static HTML page per project.
- **Per-route SEO** — a dedicated `SeoService` sets titles, meta descriptions, canonical URLs, OpenGraph/Twitter cards, and JSON-LD structured data for each page.
- **Résumé download** — the PDF is served from `src/assets/resume/` with a single source of truth for the path and filename in `src/app/shared/data/career.data.ts`.
- **Contact form** powered by EmailJS — messages are sent directly from the browser with no backend required.
- **Optimized images** — an image pipeline script batch-converts source PNG/JPG images to resized, compressed WebP.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Angular 19 (standalone components, signals) |
| UI | Angular Material, Bootstrap 5, Bootstrap Icons |
| SSR | `@angular/ssr` with Express |
| Email | EmailJS |
| Imaging | Sharp (build-time image optimization) |
| Testing | Jasmine + Karma |
| Deployment | Netlify (SPA fallback via `_redirects`) |

## Getting Started

### Prerequisites

- Node.js 18.19 or newer
- npm

### Install

```bash
npm install
```

### Development server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app reloads automatically on source changes.

### Production build

```bash
npm run build:prod
```

Build artifacts are written to `dist/`. Use `npm run build:netlify` when building for the Netlify deployment. A `postbuild` script copies `src/_redirects` into the build output so client-side routes resolve correctly on Netlify.

### Tests

```bash
npm test
```

Runs unit tests with Karma + Jasmine.

## Project Structure

```
src/app/
├── pages/                  # Routed pages
│   ├── home-page/          # Landing page
│   ├── resume/             # Résumé page with PDF download
│   ├── portfolio/          # Project grid
│   ├── project-detail/     # Case-study page per project slug
│   ├── contact/            # Contact form (EmailJS)
│   └── not-found/          # 404 page
├── shared/
│   ├── components/         # Reusable UI (header, progress bar, ...)
│   ├── data/               # Centralized data & config
│   │   ├── projects.data.ts    # Single source of truth for projects
│   │   ├── career.data.ts      # Résumé PDF path/filename constants
│   │   └── site.config.ts      # Site name, URL, SEO defaults
│   └── services/
│       └── seo.service.ts  # Per-route meta tags, canonicals, JSON-LD
scripts/
└── optimize-images.mjs     # PNG/JPG → WebP pipeline (Sharp)
```

## Content Management

Site content is data-driven — no component edits needed for routine updates:

- **Projects** — add or edit entries in `src/app/shared/data/projects.data.ts`. Each entry needs a unique `slug`, `title`, `link`, and `image`; optional `summary`, `role`, `stack`, `year`, and `highlights` fields populate the case-study page automatically. Portfolio case-study pages are prerendered per slug, so rebuild after adding a project.
- **Résumé** — replace the PDF in `src/assets/resume/` (filename must match `RESUME_PDF_PATH` in `src/app/shared/data/career.data.ts`).
- **SEO / site metadata** — update `src/app/shared/data/site.config.ts`. Set `SITE_URL` to the production domain once; canonical URLs, OpenGraph tags, and the sitemap derive from it.
- **Images** — drop source PNG/JPG files into `image-sources/portfolio/` and run:

```bash
npm run optimize:images
```

This generates optimized WebP versions in `src/assets/images/portfolio/` (900px max width, quality 80).

## Routing

| Route | Page |
| --- | --- |
| `/home` | Landing page |
| `/resume` | Résumé |
| `/portfolio` | Project grid |
| `/portfolio/:slug` | Project case study (prerendered per project) |
| `/contact` | Contact form |
| `**` | 404 page |

## Additional Resources

- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [Angular SSR Guide](https://angular.dev/guide/ssr)
