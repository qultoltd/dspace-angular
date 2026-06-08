# CLAUDE.md — DSpace Angular (Qulto custom themes)

Guidance for AI assistants working in this repo. Read this first.

## What this repo is

- A fork of **DSpace Angular** (the DSpace UI). Working copy: `dspace-angular` **11.0.0-next**,
  **Angular 20**, **Bootstrap 5**, SCSS. Main working branch: **`qulto-10.0-theming`**.
- We maintain **custom themes for Qulto customers**. The themes were originally built for DSpace 7/8 and
  ported onto the DSpace 10 line (control-flow `@if`/`@for`, standalone components, Bootstrap 4 → 5).

## Working preferences (IMPORTANT)

- **Communicate in Hungarian.**
- Prefer **SCSS-only / merge-friendly** changes; minimise component forks (see CSS-variable pattern below).
- **Do NOT offer to run or live-preview the app**, and don't add "I can't render it" caveats. The user verifies
  in their own running environment. Just make the change and note any tunable values.

## Themes & inheritance

All custom themes **extend `qulto`** (single-level hierarchy):

| Theme | Extends | What's different from qulto |
|---|---|---|
| **qulto** | — | The shared base theme. Carries most overrides (footer, login, header, navbar, home-news, home-page, publication, full-item-page, object-list, item-page DOI/title). |
| **szerep** | qulto | Navy colours, own logo, CC-license field, SZE access-status badge, table-key translation, collection/community `shortDescription` re-add, search-result list element. |
| **dspace-lifebelt** | qulto | Webinar banner (`home-news`) only. Minimal. |
| **pte** | qulto | PEA logo (+ future banner). **No component overrides** — pure CSS-var + headTags. |
| **kjk** | qulto | KJK logo + banner; publication page adds `hasPart`/`isPartOf` relations. |

`custom` and `dspace` are the stock DSpace example themes — **not used**.

## Active theme selection (`config/config.yml`)

- The active site-wide theme = the **FIRST** entry under `themes:` that has **no `regex`/`handle`/`uuid`** rule
  (`getDefaultThemeConfig`, `src/config/config.util.ts`).
- **To switch the active theme: move it to the top** of the `themes:` list.
- `src/assets/config.json` is **generated from `config.yml`** at build start. Restart `start:dev` after editing
  `config.yml`.

## CSS-variable theming pattern (the key DRY mechanism)

Child themes override **CSS variables** instead of forking qulto components. qulto components render
logos/icons/banners via `var(--ds-…, <qulto-default>)`; a child theme sets the variable in its
`styles/_theme_css_variable_overrides.scss` and inherits everything else.

**Never hardcode `/assets/<theme>/…` inside a qulto component** — use a CSS variable so children can override it.

Key variables:
- `--ds-header-logo` (+ `--ds-header-logo-height` / `--ds-header-logo-width`) — header logo (`span.header-logo`)
- `--ds-admin-sidebar-logo` — admin sidebar logo
- `--ds-lang-flag-hu`, `--ds-lang-flag-en` — language-switch flags
- `--ds-user-icon` — auth-nav user icon
- `--ds-community-icon`, `--ds-community-hover-bg` — community list element
- `--ds-home-news-banner` — home-news jumbotron background image
- `--blue`, `--primary` — primary-colour aliases (szerep maps these to its navy)

Because of this pattern, szerep/pte/kjk **do not** fork the header, admin-sidebar, lang-switch, auth-nav-menu,
community-list-element, or object-list — they only set variables.

## Registering a new theme (checklist)

1. `src/themes/<theme>/eager-theme-components.ts` — `COMPONENTS` (eager / on-every-page components; usually `[]`)
2. `src/themes/<theme>/lazy-listable-components.ts` — `LISTABLE_COMPONENTS` (`@listableObjectComponent`-decorated)
3. Aggregate both in `src/themes/eager-themes-components.ts` and `src/themes/themes-listable-components.ts`
4. `angular.json` → `styles[]`: add `{ "input": "src/themes/<theme>/styles/theme.scss", "inject": false,
   "bundleName": "<theme>-theme" }` (bundleName **must** be `<folder>-theme`)
5. `config/config.yml` → `themes:`: add `- name: <theme>` (+ `extends: qulto`)
6. `src/themes/<theme>/styles/theme.scss` must import qulto's theme **then** its own overrides, in this order:
   ```scss
   @import "../../../themes/qulto/styles/theme";
   @import "./theme_css_variable_overrides";
   ```

## headTags (favicon) — `config.yml`

- The header **logo** is a CSS variable now, **not** a headTag. Only the **favicon** lives in `headTags`.
- DS10 inherits headTags from the parent theme **only if the child has none**. So child themes that use qulto's
  favicon should **omit `headTags` entirely** and inherit it. Only add a `headTags` block to a child theme if it
  needs its own favicon.

## i18n (runtime, no merge script)

- Custom loaders in `src/ngx-translate-loaders/` load per-theme overrides **at runtime** (the build-time
  `merge-i18n` script is no longer needed).
- They load **only the ACTIVE theme's `extends` chain** (`resolveActiveThemeChain` + `getDefaultThemeConfig`).
  Sibling themes are **not** merged — this prevents cross-theme key pollution.
- Per-theme files: `src/themes/<theme>/assets/i18n/<lang>.json5`. Keys override qulto/base; unset keys fall back.

## Item-page DOI — smart field

- `src/themes/qulto/app/item-page/simple/field-components/specific-field/doi/item-page-doi-field.component.ts`
  (selector `ds-item-page-doi-field`).
- Normalises **bare DOIs** (`10.xxxx/…` → `https://doi.org/…`); full `http(s)://` URLs pass through unchanged.
  Use it instead of the generic field + `urlRegex` when bare DOIs may be stored.
- Used by qulto `publication`, szerep `untyped-item`, kjk `publication` (kjk imports it from the qulto path).

## Build / lint / test commands

- `npm run start:dev` — dev server (auto-reload; **restart** for `config.yml` changes).
- `npm run build:prod` — production SSR build.
- `npm run lint` = `build:lint` + `lint:nobuild`.  `npm run lint-fix` = `build:lint` + autofix.
- **If you edit `lint/src/**` (the custom ESLint plugin) you MUST run `npm run build:lint` before
  `lint:nobuild`** — the latter runs from compiled `lint/dist/`. (`lint:nobuild` alone uses the stale build.)
- Windows: `lint/src/util/typescript.ts` has a path-normalisation fix (`fromSrc` → `toUnixStylePath`) so the
  custom plugin works with backslash paths. **Don't revert it.**
- `npm test` — Karma unit tests.
- Fast type check (no full build): `node_modules/.bin/tsc --noEmit --project tsconfig.app.json`.

## DS7/8 → DS10 porting patterns (when bringing old theme code forward)

- Structural directives → built-in control flow: `*ngIf` → `@if`, `*ngFor` → `@for (… ; track …)`,
  `*ngSwitch`/`*ngSwitchCase` → `@switch`/`@case`. (`@angular-eslint/template/prefer-control-flow`,
  **not** autofixable — migrate by hand; the base template is the reference.) Leave `*ngVar` (DSpace directive).
- Remove `standalone: true` (default now) and any now-unused `NgIf`/`NgFor`/`NgSwitch` imports.
- Bootstrap 4 → 5: `pl-*`/`pr-*` → `ps-*`/`pe-*`, `mr-auto` → `me-auto`, `text-right` → `text-end`,
  `form-group` → `mb-3`, `font-weight-bold` → `fw-bold`, `badge-pill badge-secondary` → `rounded-pill bg-secondary`,
  `col-xs-12` → `col-12`.
- Render titles/metadata with the `[dsMetadata]` directive (gives search-hit highlighting), not plain `{{ }}`.
- A theme override component's `selector` must start with `ds-themed-` (lint: `themed-component-selectors`).

## Base-harmony principle

- Keep overrides **minimal**; prefer CSS variables / i18n over forking a component.
- When an override is genuinely needed, add a one-line **JSDoc explaining WHY it diverges from base** so future
  base upgrades can re-diff quickly. `collection-page` / `community-page` are the model.
- Periodically diff each override's template against its current base counterpart to catch silent drift
  (e.g. the title-field once lost `[dsMetadata]` highlighting this way).

## Reference branches (original pre-DS10 themes)

`qulto-8.1-kjk`, `qulto-8.1-szerep`, `qulto-8.1-pte`, `qulto-8.1`, `qulto-8.0-szerep` — the original DSpace 7/8
theme sources. Extract assets/logic with `git show <branch>:<path>`.
