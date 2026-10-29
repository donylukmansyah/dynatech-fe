# WordPress Content Model & Data Flow

Dynatech is a headless redesign. WordPress (with WooCommerce and WPML) stays
the editor and source of truth; this frontend owns the public UI, routes, and
presentation. Business context — who the company is and the fetch-only B2B
catalog scope — lives in [`company-context.md`](company-context.md).

Do not parse Elementor, WooLentor, or Templately builder output. Model content
through WooCommerce fields, taxonomies, posts, and REST-visible ACF fields.

## Live content model

Confirmed against `https://dynatech-int.com/wp-json/` on 2026-10-23.

| Domain                            | WordPress source                                                | REST base                               |
| --------------------------------- | --------------------------------------------------------------- | --------------------------------------- |
| Products                          | `product` CPT (WooCommerce)                                     | `wc/store/v1/products`, `wp/v2/product` |
| Product categories                | `product_cat` taxonomy (hierarchical)                           | `wc/store/v1/products/categories`       |
| Product tags                      | `product_tag` taxonomy                                          | —                                       |
| Articles / News / Events / Career | `post` CPT, categories `artikel` / `news` / `events` / `career` | `wp/v2/posts`                           |
| About Us, Contact Us              | `page`                                                          | `wp/v2/pages`                           |
| Media                             | attachments                                                     | `wp/v2/media`                           |

The catalog's three menu dimensions — **By Manufacturer**, **By Market**,
**By Product** — are top-level branches of the hierarchical `product_cat` tree.
A product can sit under several branches at once, so one product appears in
several listings.

> Before writing any mapper, fetch the real REST response for that type and
> model the fields you actually get. Do not assume fields from this table.

## Read flow

```text
WordPress / WooCommerce / WPML
  → public REST response
  → feature source  (server-only fetch + cache + errors)
  → feature mapper  (sanitize + shape into a typed model)
  → server function (createServerFn RPC boundary)
  → TanStack Query  (cache, retry, SSR hydration)
  → feature pages and components
```

### Today: static constants

The site is static for now. Each section imports typed content from
`features/<name>/constants/` (see `home-page.md`). Those types are the
contract: when the `api/` layer lands, the mapper returns the same shape and
the section swaps one import for a query. No component markup changes.

### The `api/` layer, file by file

Each feature that reads WordPress keeps the layer local. Example for products:

```text
features/products/
  api/
    product-source.server.ts  server-only fetch; owns WORDPRESS_URL
    product-mapper.ts         raw WP/WC JSON → typed model; sanitizes HTML
    product-queries.ts        queryOptions: keys, retry policy, staleTime
    product-api.ts            createServerFn wrappers — list + detail
  types/
    product.ts                frontend model, no WP shapes leak out
```

Responsibilities:

- **`*-source.server.ts`** is the only place that reads `WORDPRESS_URL` and
  calls WordPress. The `.server.ts` suffix keeps it out of the client bundle.
  It adds a request timeout, names its errors (`TimeoutError`,
  `WordPressHttp5xx`, …), and caches hot reads briefly (≈60s).
- **`*-mapper.ts`** turns raw JSON into the `types/` model and sanitizes all
  rich text. Components never receive a raw WordPress object.
- **`*-api.ts`** holds thin `createServerFn({ method: 'GET' })` wrappers that
  validate input with zod and call the source. This is the client↔server seam;
  secrets and the CMS origin never cross it.
- **`*-queries.ts`** exposes `queryOptions` used by both route loaders
  (prefetch) and components (`useSuspenseQuery`). Keep query keys here.

`lib/wordpress.ts` holds only the generic request helper (origin resolution,
timeout, error naming). It must not contain product or article logic.

### Why server functions and not a browser fetch

- The CMS origin stays private; the public site never discloses it.
- No CORS coupling to the WordPress host.
- One caching and error-handling path, shared by SSR and client navigation.

If a public read is ever safe to do from the browser, it still goes through the
server function so caching and error shape stay uniform.

## Products

WooCommerce supplies the commerce fields; an ACF group supplies detail content.

| Content                           | Source                              |
| --------------------------------- | ----------------------------------- |
| Name, slug, status                | WooCommerce product                 |
| Primary image, gallery            | Product images (preserve order)     |
| Short card copy                   | Short description                   |
| Manufacturer / Market / Product   | `product_cat` branches              |
| Datasheet, specs, video, brochure | ACF group, **Show in REST** enabled |

The Store API response still carries `add_to_cart` and `is_purchasable`, and
every price is `$0.00`. This is a B2B catalog: model name, images,
descriptions, categories, and attributes only — no price, cart, or checkout.

Use one ACF field group on Products with **Show in REST API** on. Treat
repeater/gallery/flexible fields as ACF Pro only; until that is approved, model
specifications as a controlled WYSIWYG table and keep the WooCommerce gallery as
the image source.

## Articles, News, Events

Editorial is **one `post` type split by category** — confirmed against the live
API on 2026-10-23. Categories: `artikel` (Articles), `news` (News), `events`
(Events), and `career` (Career). Shared fields: title, slug, excerpt, featured
image, author, published date, categories, rich body. `features/articles/` (or a
shared editorial feature) owns the mapper and the list/detail UI; each menu is a
category view of that domain. Career had no published posts at verification
time, so its empty state must be designed deliberately.

## Rich text safety

WordPress WYSIWYG and WooCommerce descriptions return HTML, not structured JSON.
Render it only after sanitizing.

- Use the `sanitize-html` package with a small explicit allowlist: paragraphs,
  headings, emphasis/strong, lists, links, blockquotes, tables, images, and
  approved embeds only.
- Reject scripts, inline event handlers, unknown iframes, and unsafe URL
  schemes.
- Rich text supplies document body only. It must never control page layout,
  navigation, cards, tabs, or arbitrary CSS classes.

## Internationalization (WPML)

The live site is bilingual via **WPML** with `/en/` and `/id/` URL prefixes and
separate translated objects per language.

- The frontend carries a language segment (`/en`, `/id`) or a language context;
  routes resolve the active locale and pass it down.
- Feature sources request the matching WPML language (e.g. `?lang=en`) and map
  the translated object. Confirm WPML's REST language parameter against the live
  API before relying on it.
- Each localized page links its counterpart with `hreflang` alternates for SEO
  (see `seo-i18n.md`).
- Prefer WordPress-provided translations over duplicated frontend copy. Static
  UI strings live in `lib/i18n/`.

## Secrets & configuration

- `WORDPRESS_URL` is a **server-only** origin read by the Node process. Never
  expose it, WooCommerce consumer keys, or any token through a `VITE_*` value.
- Public reads use the WooCommerce Store API and core REST, which need no keys.
- If a privileged write is ever required (forms, counters), it runs server-side
  through a server function, never from the browser.

## Implementation order

1. Confirm product ACF field names and REST visibility.
2. Confirm the `product_cat` branches for Manufacturer / Market / Product.
3. Inspect real REST responses; write `types/` and mappers against them.
4. Build listing and detail against fixtures, then connect REST.
5. Confirm the editorial category workflow, then build Articles/News/Events.
6. Confirm Career's source and build it.
7. Add any server-side form or analytics only after content is stable.
