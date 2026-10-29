# Folder & Naming Conventions

How source is organized in `dynatech-fe`. Read this before adding or moving
files. The goal: the next developer opens any folder and knows what lives
there without a tour. The layout follows the sibling project `ascentia-fe`.

## Goal

- Find a URL, its params/search, and loaders in `routes/`.
- Find a page's composition, UI, static content, and data access in
  `features/`.
- Find persistent shell UI in `components/layout/`.
- Find context-free primitives in `components/ui/`.
- Find cross-cutting browser behavior in `hooks/`, helpers in `lib/`.

## Current structure

```text
src/
  routes/                      URL identity only (TanStack Router owns this)
    __root.tsx                 html shell, <main>, header, footer, styles
    index.tsx                  /  → features/home/pages/home-page

  features/
    home/
      pages/home-page.tsx      composes the sections, starts page motion
      components/              one file per section; multi-part sections
        hero/                  get one folder (hero-section + its parts)
        products/
        news-events/
        contact/
        trust-section.tsx
        customers-section.tsx
        insights-section.tsx
      constants/               static content: hero.ts, catalog.ts, ...
      hooks/                   use-home-motion, use-catalog-browser,
                               use-office-map

  components/
    layout/
      site-header/             index.tsx + desktop-nav, mobile-menu,
                               navigation-data, use-menu-overlay
      site-footer/             index.tsx + footer-data
    ui/                        glow-button, section-header, arrow-button,
                               marquee, card-deck-carousel, notched-card,
                               grid-backdrop, animated-tooltip

  hooks/                       use-sticky-header, use-reduced-motion,
                               use-magnetic, use-in-view, use-section-tab
  lib/                         utils (cn), smooth-scroll (Lenis instance)
  types/css.d.ts               allows CSS custom properties in style={{}}
  styles.css                   Tailwind import, tokens, base, a few components
```

Target shape for later domains (create only when work starts):

```text
features/products/
  api/        product-api.ts, product-source.server.ts, product-mapper.ts,
              product-queries.ts
  components/ product-card.tsx
  pages/      product-list-page.tsx, product-detail-page.tsx
  types/      product.ts
```

Do not pre-create empty `api/`, `hooks/`, `forms/`, or feature folders.

## Naming

**Every source file is kebab-case**, same as `ascentia-fe` and the shadcn CLI.
The exported identifier keeps normal TypeScript case.

| What                 | File                                 | Export              |
| -------------------- | ------------------------------------ | ------------------- |
| Component            | `catalog-card.tsx`                   | `CatalogCard`       |
| Page module          | `home-page.tsx`                      | `HomePage`          |
| Multi-part component | `site-header/index.tsx`              | `SiteHeader`        |
| Hook                 | `use-office-map.ts`                  | `useOfficeMap`      |
| Static content       | `constants/offices.ts`               | `offices`, `Office` |
| Server-only source   | `product-source.server.ts`           | `fetchProducts`     |
| Route                | `about-us.tsx`, `products/$slug.tsx` | `Route`             |

Rules:

- Name a file by responsibility, never `helpers.ts` or `utils.ts` inside a
  feature.
- Prefer direct imports. No barrel `index.ts` just to shorten a path; a folder
  `index.tsx` is fine when the folder _is_ the component.
- Co-locate tests next to the unit: `product-mapper.test.ts`.
- Keep every file under ~250 lines. When a component grows, split its parts
  into a sibling file in the same folder (see `site-header/`).

## Where things go

- **Static content** (copy, lists, image paths) lives in the feature's
  `constants/`, typed, never inline in JSX. When WordPress data arrives, the
  same shape comes from `api/` instead and the component does not change.
- **Behavior** (state, effects, observers, GSAP) lives in a hook. Components
  stay markup + props.
- **Styling** is Tailwind classes in the component. `styles.css` holds only
  tokens, base resets, keyframes, and component classes too complex for
  utilities (`glow-btn`, `glass-pill`). No per-feature CSS files.
- **Images** in `public/` are grouped by purpose (see below) and referenced
  from `constants/`, so a path changes in one place.

## `public/` layout

```text
public/
  brand/                 Dynatech logos (color, square, geometric)
  icons/                 favicon + PWA icons
  images/
    covers/              article / news / product covers
    hero/ backgrounds/ banners/
  logos/
    certifications/      ISO + KAN marks
    customers/           customer logos (marquee)
    principals/          principal / manufacturer logos
    group/               Dynatech Group sister companies
```

File names are kebab-case with no spaces. Rebuild (`pnpm build`) after adding
files so Nitro copies them into `.output/public/`.

## Layer ownership

### `routes/`

TanStack Router owns this directory. A route file maps one URL, reads params
and search state, wires loaders, and selects a feature page. No page markup.
Never edit `src/routeTree.gen.ts` by hand; run `pnpm generate-routes`.

### `features/`

A feature owns one page context or domain. Sub-folders, only when they hold
real files: `pages/`, `components/`, `constants/`, `hooks/`, `api/`, `types/`,
`forms/`. Max one extra nesting level, only to group a multi-part section.

### `components/layout/`

Persistent site shell: `site-header/`, `site-footer/`, and their parts. The
header talks to homepage sections only through `hooks/use-section-tab`, never
by importing from `features/`.

### `components/ui/`

Context-free primitives usable by any feature. No business copy inside; data
comes in through props. Extract here only after a second concrete use or when
the piece is clearly generic (section header, marquee).

### `hooks/` and `lib/`

`hooks/` = reusable browser behavior. `lib/` = plain modules without React
(`cn`, the Lenis instance, later `wordpress.ts`, `seo.ts`).

## Dependency direction

```text
routes → features → components / hooks / lib
```

`components/`, `hooks/`, and `lib/` never import from `features/` or
`routes/`.

## Adding a new feature (recipe)

1. `features/<name>/pages/<name>-page.tsx` with static markup first.
2. Content into `features/<name>/constants/`, typed.
3. A route in `routes/` that renders the page; run `pnpm generate-routes`.
4. When real data is needed, add `api/` per `data-flow.md` and swap the
   constant import for the query; component props stay the same.

## Comments

- Indonesian, `//` one line, max 60 chars. No JSDoc, no `/* */` in TS/TSX
  (including `{/* */}` in JSX — put the note as `//` above the element's
  constant or function instead).
- Why-only. Never restate obvious layout or animation. One note per spot.
- Delete commented-out code, dead `TODO`s, and dead aliases.
