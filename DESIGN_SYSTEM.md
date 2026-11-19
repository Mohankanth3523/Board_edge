# Board Edge Technologies — Design System

Live reference: run the site and open `/design-system`.

## Concept: the engineering drawing
The visual language comes from PCB fabrication drawings: hairline construction grids, corner registration marks, dimension lines, numbered sections (`01 — Hardware R&D`, continuing the brochure's numbering), and spec-sheet layouts. Green is used like a test-pass signal: primary actions, active states, the routed net in the hero drawing. Navy carries the brand.

## Colour
The client's suggested palette, refined towards the logo's actual navy (#0B2A5C) and green (#009A3E). All text pairings meet WCAG AA.

| Token | Hex | Role |
|---|---|---|
| navy-950 | #0B1F33 | Hero, dark bands, footer (client "Deep Navy") |
| navy-900 | #102A43 | Dark surfaces (client "Primary Navy") |
| navy-700 | #0B2A5C | Logo navy — headings on light (14.0:1) |
| navy-600 | #1A4A80 | Links/hover (9.0:1) |
| green-500 | #17A655 | Primary button fill, navy text (5.4:1) |
| green-400 | #45C47A | Green on navy (≈7:1) |
| green-700 | #0A7A41 | Green text on light (5.4:1) |
| blue-700 / 600 | #0F6C98 / #1685B8 | Student pathway accent (client "Accent Blue"; 600 for icons/large text only) |
| ink | #172B3A | Body text (client "Text") |
| muted | #4F6475 | Secondary text (6.2:1) |
| surface | #F3F7FA | Light blue-grey background (client "Light Background") |
| line | #DCE4EB | Hairlines |

Usage: ~60% white/surface, ~30% navy, ≤10% green. Blue appears only in the student pathway and information notices.

## Typography
Inter Display (600/700) for headings, Inter (400/500/600) for body and UI. Both self-hosted.

| Token | Size (mobile → desktop) |
|---|---|
| `text-display` | 40 → 72px, −0.035em |
| `text-h1` | 34 → 56px |
| `text-h2` | 28 → 44px |
| `text-h3` | 20 → 24px |
| `text-statement` | 24 → 38px |
| `text-lead` | 17 → 20px |
| body | 17px / 1.65 |
| `eyebrow` | 12px uppercase, +0.14em |

## Components
| Component | File |
|---|---|
| ButtonLink / Button (primary, secondary, secondary-dark, navy, light, ghost, ghost-dark) | `components/ui/Button.tsx` |
| Section (`tone`, `flushTop` — drops top padding when the previous section has the same tone), Container, Eyebrow, SectionHeading | `components/ui/Section.tsx` |
| CapabilityCard (hairline spec grid), ServiceSpecCard, FeatureChip (`as="li"` default; `as="div"` inside a `<Reveal as="li">`) | `components/ui/Cards.tsx` |
| TextField, SelectField, TextareaField, CheckboxField, Alert | `components/ui/Field.tsx` |
| Breadcrumbs | `components/ui/Breadcrumbs.tsx` |
| Header + UtilityBar + MegaMenu + Dropdown | `components/layout/Header.tsx` |
| MobileNav | `components/layout/MobileNav.tsx` |
| Footer, SiteLayout | `components/layout/` |
| Logo, BoardRender (illustrative PCB drawing) | `components/brand/` |
| MediaFrame (image slot with labelled placeholder) | `components/media/MediaFrame.tsx` |
| Reveal, DrawLine (scroll motion) | `components/motion/Reveal.tsx` |

## Motion rules
- Fade-and-rise ≤14px, 0.6s, once. Opacity and transform only.
- The hero headline is never animated (it is the LCP element).
- Hover: colour/border transitions and small arrow nudges in CSS — no JS hover animation.
- `MotionConfig reducedMotion="user"` + a global CSS rule disable motion under `prefers-reduced-motion`.

## Imagery
No real photography exists yet. Rules:
- Real Board Edge photography only in the gallery; never stock presented as their work.
- `MediaFrame` shows a labelled placeholder describing the needed shot in design previews; nothing in production.
- The hero uses `BoardRender`, an engineering-style illustration captioned "Illustrative PCB layout".

## Imagery (updated)
Reference photography (Unsplash) is registered in `app/content/images.ts` and rendered with `components/media/Photo.tsx` (responsive `srcset`, explicit dimensions). Every reference image is labelled "Reference image" on the page and credited; none is presented as Board Edge work. Alt text describes what each photo actually shows. Replace with company photography by setting `source: "company"` and a local `src`.

## Accessibility checks to keep
- No nested list items (React hydration fails on invalid nesting).
- Text links have a 44px tap area (ghost buttons) or at least 24px (photo credits).
