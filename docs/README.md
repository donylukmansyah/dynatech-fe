# Docs

Architecture and conventions for `dynatech-fe`. Read these before writing
source; `AGENTS.md` at the repo root is the short version.

## Architecture

- [`architecture/company-context.md`](architecture/company-context.md) — who PT
  Dynatech International is, the live WordPress site being redesigned, the
  fetch-only B2B catalog scope, and the menu → REST-source map (Indonesian).
- [`architecture/folder-conventions.md`](architecture/folder-conventions.md) —
  how source is organized: feature-first layout, kebab-case naming, where
  content / behavior / styling / images go, dependency direction.
- [`architecture/home-page.md`](architecture/home-page.md) — homepage sections,
  their data files, the motion attributes, and the performance rules already
  applied (Indonesian).
- [`architecture/design-system.md`](architecture/design-system.md) — color,
  radius, font, layout and motion tokens, base components (Indonesian).
- [`architecture/data-flow.md`](architecture/data-flow.md) — the WordPress /
  WooCommerce / WPML content model and the read flow from REST to components
  (source → mapper → server function → query → UI).
- [`architecture/seo-i18n.md`](architecture/seo-i18n.md) — the SEO contract
  (head, indexing, sitemap, structured data, legacy redirects) and the
  bilingual EN/ID strategy.

## References

- `ascentia-fe` — sibling headless-WordPress site on the same stack; source of
  the feature-first layout, kebab-case naming, `constants/` content pattern,
  and the data-flow split.

## When adding to these docs

Keep each doc focused on one concern. Record a decision where developers will
look for it, not in a changelog. Prefer a short rule with a reason over a long
explanation.
