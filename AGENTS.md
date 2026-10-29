# Dynatech Frontend (`dynatech-fe`)

Headless WordPress frontend for **PT Dynatech International** — an Indonesian
B2B distributor of industrial testing, analytical, and laboratory instruments
(mechanical testing, material testing, metrology, microscopy, didactic,
reliability). WordPress + WooCommerce + WPML stay the CMS; this app owns the
public UI and fetches content through the REST API.

WooCommerce here is a **catalog, not a shop**: no cart, checkout, accounts,
payments, or price display. Editorial scope is Articles, News, Events, Career.

Start with `docs/architecture/` before writing source — in particular
`company-context.md` for who the company is and which surfaces we fetch. This
file is the quick reference; the docs hold the detail.

## Toolchain & Commands

- Package manager: `pnpm` (Node 20+).
- Dev server: `pnpm dev` (Vite on port 3000).
- Build: `pnpm build` → Nitro Node server in `.output/`.
- Production server: `node .output/server/index.mjs`.
- Route tree: `pnpm generate-routes` after adding or changing route files.
- Checks: `pnpm lint` (ESLint), `pnpm typecheck`, `pnpm check` (Prettier),
  `pnpm format` (Prettier + ESLint fix). Run lint + typecheck before handing
  work back. The ESLint config has no `react-hooks` plugin, so never add
  `eslint-disable react-hooks/...` comments.

## Stack

React 19 · TanStack Start + Router · Nitro · Vite · Tailwind CSS v4 ·
shadcn/ui over `@base-ui/react` · TypeScript · `sanitize-html` · zod.

## Architecture & ownership

- Read `docs/architecture/folder-conventions.md` before adding or moving files,
  and `docs/architecture/home-page.md` before touching the homepage.
- `routes/` owns URL identity, params/search, and loaders. It selects a feature
  page; no page markup lives there. `__root.tsx` renders header, `<main>`,
  footer.
- `features/<domain>/` is feature-first: `pages/`, `components/`,
  `constants/`, `hooks/`, `api/`, `types/`, `forms/`. Add a sub-folder only
  when its first real file exists — never pre-create empty folders.
- Static content lives in the feature's `constants/` (typed). Components get it
  through imports/props; never hardcode copy or image paths in JSX.
- Behavior (state, effects, GSAP, observers) lives in hooks; components stay
  markup + props.
- `components/layout/` = persistent shell (`site-header/`, `site-footer/`).
  `components/ui/` = context-free primitives (`section-header`, `glow-button`,
  `marquee`, ...). `hooks/` = shared browser behavior. `lib/` = plain helpers
  (`utils.ts`, `smooth-scroll.ts`).
- Dependency direction: `routes → features → components / hooks / lib`. Shared
  modules never import from `features/` or `routes/`; the header reaches a
  homepage section only via `hooks/use-section-tab`.

## Naming

- **Every file is kebab-case** (same as `ascentia-fe`): `catalog-card.tsx`,
  `home-page.tsx`, `use-office-map.ts`, `product-source.server.ts`. Exports keep
  normal TS case (`CatalogCard`, `useOfficeMap`).
- A multi-part component is a folder with `index.tsx` (`site-header/`).
- Name by responsibility, not `helpers.ts`. Prefer direct imports; no barrels.
- Keep files under ~250 lines; split parts into siblings in the same folder.

## Flat, not nested

- One folder holding several files is fine; a folder wrapping one file is not.
- Max one extra nesting level inside a feature, only to group a multi-part
  section (`components/hero/`, `components/contact/`).
- Data layer per responsibility in `api/`: `*-source.server.ts`,
  `*-mapper.ts`, `*-queries.ts`, `*-api.ts` (server function wrappers).

## Headless WordPress

- Read `docs/architecture/data-flow.md` before any product, article, news,
  event, career, taxonomy, or ACF work.
- WordPress/WooCommerce is the source of truth; this frontend owns presentation.
  Do not parse Elementor / WooLentor / Templately builder output.
- Read flow: `source.server` → `mapper` → `createServerFn` → TanStack Query →
  components. Components receive typed models only, never raw WordPress objects.
- Products: WooCommerce `product` + `product_cat` branches
  (By Manufacturer / By Market / By Product). Editorial (Articles / News /
  Events / Career) is one `post` type split by category — confirmed against
  the live API.
- `WORDPRESS_URL` is **server-only**. Never place the CMS origin, WooCommerce
  keys, or tokens in `VITE_*` values. Public reads go through a server function
  for caching, error shape, and CORS isolation.
- REST rich text is HTML: sanitize with `sanitize-html` and an explicit
  allowlist before rendering. CMS HTML never controls layout or runs scripts.

## SEO & i18n

- Read `docs/architecture/seo-i18n.md` before SEO, routing, or language work.
- Head/meta/schema come from `lib/seo.ts`, server-rendered; canonical and schema
  URLs come from frontend routes.
- Bilingual EN/ID via WPML `/en` and `/id` prefixes. Every route exists under
  both; emit `hreflang` alternates and language-correct canonical.
- `SITE_INDEXABLE=false` on staging adds `X-Robots-Tag: noindex, nofollow`.
  Legacy WordPress/WPML URLs redirect in `src/server.ts` before the app handler.

## Design system

- Tokens live in `src/styles.css`; roles and rules in
  `docs/architecture/design-system.md`. Read it before any UI, color, or
  styling work. Never hardcode hex — use semantic utilities.
- **Primary = blue `#092F87`** (`bg-primary`): brand, links, secondary buttons,
  focus. **CTA = orange `#F28B3B`** (`bg-cta`): primary action buttons ONLY,
  scarce — ideally one per screen. CTA text is navy `#10213F`
  (`text-cta-foreground`), never white (fails AA contrast).
- Neutrals carry ~90% of the UI: `background`, `background-soft`, `foreground`,
  `muted-foreground` (descriptions), `border`. Status: `success` `warning`
  `error` `info`, each with `-soft` bg + `-soft-foreground` text.
- Radius is one scale: button `rounded-md` (6px), card `rounded-lg` (8px).
  Exception: large homepage media frames use `rounded-card` (28px).
- Font: **Plus Jakarta Sans** (`font-sans`), self-hosted via
  `@fontsource-variable/plus-jakarta-sans` imported in `styles.css`.
- Adding a color means adding a token (in `styles.css` + the doc), not an
  ad-hoc hex in a component.
- Style with Tailwind classes in the component. `styles.css` holds only tokens,
  base, keyframes (`--animate-*`), utilities (`px-page`, `w-frame`) and a few
  component classes (`glow-btn`, `glass-pill`). No per-feature CSS files.
- Secondary actions use `<GlowButton variant="outline">`; orange `cta` stays
  for the primary action.

## Comments

- Write comment text in **Indonesian**.
- `//` one line only. Max 60 chars. No JSDoc, no `/* */` — that includes
  `{/* */}` in JSX; put the note as `//` above the const or function.
- CSS has no `//`: use a single-line `/* ... */`. Still short and why-only.
- No decorative banners or dividers (`/* ==== */`, `/* ---- */`, ASCII art).
  A plain one-line label is enough to group a block.
- Why-only, when code cannot show it. Never restate obvious layout/animation.
- Comment sparingly. Skip notes on self-evident tokens, values, or labels.
- One note per spot; never duplicate the same reason in one file.
- Delete commented-out code, dead `TODO`s, and dead aliases.

## Assets

- Static files live in `public/`, grouped by purpose: `brand/`, `icons/`,
  `images/{covers,hero,backgrounds,banners}/`,
  `logos/{certifications,customers,principals,group}/`. Kebab-case names, no
  spaces. Reference paths from `constants/`, not JSX.
- After adding files there, rebuild
  (`pnpm build`) so Nitro copies them into `.output/public/`.
