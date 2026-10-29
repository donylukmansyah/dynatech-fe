# Dynatech Frontend

Headless WordPress frontend for Dynatech International. WordPress + WooCommerce +
WPML remain the CMS; this app renders the public site and fetches content
through the REST API.

## Stack

- React 19
- TanStack Start and TanStack Router
- Nitro Node server adapter
- Tailwind CSS v4
- shadcn/ui over Base UI
- TypeScript, zod, sanitize-html

## Requirements

- Node.js 20+
- pnpm

## Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Environment

Create `.env` from `.env.example`:

```env
WORDPRESS_URL="https://dynatech-int.com"
SITE_INDEXABLE="false"
PUBLIC_SITE_URL="http://localhost:3000"
```

`WORDPRESS_URL` is the server-only CMS origin. Set `SITE_INDEXABLE=false` on
staging. These variables are read by the Node process, not by Vite. Never put
the CMS origin, WooCommerce keys, or tokens in `VITE_*` values.

## Commands

```bash
pnpm dev             # Start development server (port 3000)
pnpm build           # Build the Nitro production server
pnpm preview         # Preview the production build
pnpm generate-routes # Regenerate the TanStack Router route tree
```

Lint, format, and typecheck scripts are documented in `AGENTS.md` and will be
wired with the ESLint/Prettier setup before feature work begins.

## Production build

```bash
pnpm build
node .output/server/index.mjs
```

The build creates a self-contained Node server in `.output/`. Do not commit
`.output/`; it is generated per build.

## Documentation

Architecture and conventions live in `docs/` — start with
[`docs/README.md`](docs/README.md) and `AGENTS.md`.

| Doc                                       | Purpose                                                 |
| ----------------------------------------- | ------------------------------------------------------- |
| `AGENTS.md`                               | Quick conventions reference for contributors and agents |
| `docs/architecture/folder-conventions.md` | Foldering, file naming, anti-sprawl rules               |
| `docs/architecture/data-flow.md`          | WordPress content model and read flow                   |
| `docs/architecture/seo-i18n.md`           | SEO contract and bilingual (WPML) strategy              |

## Project structure

```text
src/
  routes/       File-based TanStack routes (URL identity only)
  features/     Feature-first page/domain modules
  components/   layout / shared / ui
  hooks/        Cross-cutting browser behavior
  lib/          Configured clients, SEO, i18n, utils
  styles.css    Tailwind and design tokens
public/         Static assets
```

Add a route by creating a file in `src/routes/`, then run `pnpm generate-routes`.

## Content source

WordPress remains the CMS for products, media, pages, and editorial content.
Products read from the WooCommerce Store API (`/wp-json/wc/store/v1/products`)
and `wp/v2/product`; editorial reads from `wp/v2/posts`. Keep secrets
server-side and sanitize all CMS HTML before rendering.
