# Board Edge Technologies — Website

Corporate website for **Board Edge Technologies** — Electronics Engineering, Hardware R&D and Electronics & Electrical Assembly (Bengaluru & Tamil Nadu).

**Status:** Homepage complete (13 sections). Inner pages show a temporary "being prepared" page (noindex) so every link works; they are built in the next phase. Forms, full SEO and deployment follow later — see `WEBSITE_STRATEGY.md` in the parent folder.

## Stack
React 19 · TypeScript · Vite · React Router (framework mode, static pre-rendering) · Tailwind CSS v4 · Motion · Lucide React. React Hook Form + Zod are added in Phase 6 (forms).

## Run locally
Requires Node.js 20.19+. On Windows you can also double-click the helpers in `dev-tools/` (install, check + build, dev server, preview).

```bash
npm install
npm run dev        # http://localhost:5173  (design system: /design-system)
npm run build      # pre-renders every route to build/client
npm run typecheck
```

## Where things live
| What | File |
|---|---|
| Company details (phone, email, address, domain…) | `app/config/site.ts` — leave unknown values `null`; dependent UI hides itself |
| Homepage copy | `app/content/home.ts` (each block notes its source: brochure / brief / proposed) |
| Services (titles, summaries, scope bullets, icons) | `app/content/services.ts` |
| Navigation & footer links | `app/content/navigation.ts` |
| Project gallery (real projects only) | `app/content/projects.ts` — once it has items they replace the reference photos automatically |
| Photography (reference images, credits) | `app/content/images.ts` |
| Site map / inner pages | `app/content/pages.ts` (set `ready: true` when a page is built) |
| Design tokens (colours, type scale, utilities) | `app/styles/app.css` |
| Logo files | `public/images/brand/` |
| Fonts (self-hosted Inter / Inter Display, Latin subset) | `public/fonts/` |

## Before going live
- Set `site.preview.showImagePlaceholders` and `site.preview.showContactPlaceholders` to `false`.
- Replace reference photography with Board Edge's own photos where possible, and self-host any Unsplash images you keep (download into `public/images/` and set `src` to the local path in `images.ts`).
- Replace `site.url` with the confirmed domain.
- Remove or keep `noindex` on `/design-system`.

## Photography credits (reference images, Unsplash License)
Tim Käbel · Ludovico Ceroseis · Anne Nygård · Vishnu Mohanan · Sahand Babali · Blaz Erzetic · Frames For Your Heart · Gez Xavier Mansfield — links in `app/content/images.ts`. These images are illustrative only and are never presented as Board Edge Technologies' own work or premises.
