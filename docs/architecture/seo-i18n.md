# SEO & Internationalization

Dynatech is an established, indexed site. The redesign must keep its ranking
surface intact: same public URLs where possible, correct redirects where not,
and clean bilingual signals.

## Head & metadata

- Build all head tags server-side from a single `lib/seo.ts` helper
  (`createSeoMeta`): title, description, canonical, Open Graph, Twitter card,
  and JSON-LD schema.
- Canonical and schema URLs come from **frontend routes**, never from raw CMS
  head output.
- Map the CMS SEO plugin's title/description/social image/robots into the SSR
  head. If Yoast (or Rank Math) is active, read its `*_head_json` and map
  fields; do not inject the CMS's raw `<head>` markup.
- Per-route defaults cascade from `__root.tsx`; pages override title,
  description, image, and schema through their loader.

## Indexing control

- `SITE_INDEXABLE=false` on staging → every response gets
  `X-Robots-Tag: noindex, nofollow` (set in `src/server.ts`).
- `SITE_INDEXABLE=true` only on production after review; restart the Node
  process so the flag takes effect.
- CMS protection must be host-only. Do not globally discourage search in
  WordPress and then consume that directive on the public frontend.
- Search-query pages and unavailable listing pages are `noindex`. Listing
  category and pagination pages keep real canonical URLs and real `href`s.

## Sitemap

- Serve `/sitemap.xml` from a server route built from published product and
  post IDs with paginated reads. Exclude `noindex` editorial, dedupe posts in
  multiple categories, cache ~60s.
- Emit per-language URLs (see i18n below). Redirect any legacy
  `/sitemap_index.xml` to the new sitemap.

## Bilingual (WPML, `/en` + `/id`)

The live site serves `https://dynatech-int.com/en/...` and `/id/...` via WPML.
Preserve that structure.

- Every route exists under both language prefixes. The active locale drives the
  WordPress language fetched (see `data-flow.md`).
- Each page emits `hreflang` alternates for its `en` and `id` counterparts, plus
  `x-default`. Canonical points to the same-language URL.
- Open Graph `og:locale` reflects the active language
  (`en_US` / `id_ID`).
- A translated object that does not exist in the other language omits that
  alternate rather than linking a 404.

## Legacy URL continuity

The current site is WordPress + Elementor with WPML. Before cutover, map the old
URL surface to the new routes.

- Old product permalinks (`/en/product/:slug/`, `/en/products/`), category
  pages (`/en/product-categories/by-manufacturer/`, `by-market`, `by-product`),
  and editorial paths (`/en/articles/`, `/en/news/`, `/en/events/`,
  `/en/career/`) must resolve — as the same route or a `301` to its equivalent.
- Keep `/en` and `/id` prefixes; do not collapse languages into one path.
- Legacy `/wp-content/uploads/...` media redirects to the CMS origin when the
  CMS is served from a different host than the frontend.
- Handle redirects in `src/server.ts` before the app handler, like the sibling
  `ascentia-fe` project.
- Keep redirects for at least a year and monitor 404/5xx and Search Console.

## Structured data

- Emit `Organization` / `WebSite` schema on the homepage, `BreadcrumbList` on
  nested pages, and `Product` schema on product detail.
- Product schema omits fabricated offers, prices, and reviews. Valid markup does
  not guarantee rich results.

## Pre-cutover checklist (external work)

1. Back up WordPress files, database, and hosting routing; test rollback.
2. Freeze the final taxonomy: Manufacturer / Market / Product branches under
   `product_cat`, ACF REST fields, approved posts. The current live taxonomy is
   not automatically the contract.
3. Export every indexed URL from Search Console; map each to a new route or a
   redirect. Nested legacy categories need an explicit target, not a catch-all.
4. Configure HTTPS, HTTP→HTTPS, and `www` normalization in hosting. Do not touch
   email/MX records. (The current TLS certificate does not cover the apex host —
   fix this during cutover.)
5. Deploy to staging with `SITE_INDEXABLE=false`; verify metadata, hreflang,
   canonical, redirects, and media.
6. Set production `SITE_INDEXABLE=true`, switch routing, re-verify headers, and
   submit the sitemap. No Search Console Change of Address to the CMS.

## Environment

| Variable          | Scope       | Purpose                                  |
| ----------------- | ----------- | ---------------------------------------- |
| `WORDPRESS_URL`   | server only | CMS REST origin; never exposed           |
| `SITE_INDEXABLE`  | server only | `false` on staging, `true` on production |
| `PUBLIC_SITE_URL` | server only | canonical/OG absolute base               |

These are read by the Node process, not by Vite. Keep secrets out of `VITE_*`.
