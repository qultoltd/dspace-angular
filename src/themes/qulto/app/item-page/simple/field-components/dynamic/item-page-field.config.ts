import { Config } from '@dspace/config/config.interface';

/**
 * A single field/relation rendered on an item page, resolved to one of the container
 * components registered in `ITEM_PAGE_FIELD_CONTAINER_REGISTRY`. Properties beyond
 * `container` are passed straight through as that component's `@Input()`s, so which
 * ones apply depends on the chosen container (e.g. `fields` for `generic`/`uri`,
 * `relationType` for `related-items`, `pointFields`/`bboxFields`/`cluster` for `geospatial`).
 */
export interface ItemPageFieldConfig extends Config {
  container: string;
  label?: string;
  fields?: string[];
  separator?: string;
  urlRegex?: string;
  enableMarkdown?: boolean;
  itemType?: string;
  metadataFields?: string[];
  incrementBy?: number;
  relationType?: string;
  relationTypes?: { label: string; filter: string; configuration?: string }[];
  variant?: 'small' | 'full';
  ccLicenseUriField?: string;
  ccLicenseNameField?: string;
  showName?: boolean;
  showDisclaimer?: boolean;
  pointFields?: string[];
  bboxFields?: string[];
  cluster?: boolean;
  searchEnabled?: boolean;
  sideBarWidth?: number;
}

/**
 * Ordered field lists for one entity type's item page. `leftSide`/`rightSide` map to the
 * two metadata columns; `fullWidth` renders below both (e.g. kjk's tabbed related-entities
 * search).
 */
export interface ItemPageLayoutConfig extends Config {
  leftSide?: ItemPageFieldConfig[];
  rightSide?: ItemPageFieldConfig[];
  fullWidth?: ItemPageFieldConfig[];
}

/**
 * Root `config.yml` `itemPage` key, keyed by entity type (e.g. `Publication`, or `Item` for
 * untyped items). Declared once at the top level rather than per-theme: a single deployment
 * only ever runs one active theme, so there is no need to namespace this by theme name.
 */
export interface ItemPageConfig extends Config {
  [entityType: string]: ItemPageLayoutConfig;
}

/**
 * Augments the core `AppConfig` (rather than editing `src/config/app-config.interface.ts`
 * directly) so this config-driven item-page feature — and its types — stay self-contained
 * under the qulto theme. TypeScript declaration merging picks this up because
 * `tsconfig.app.json`/`tsconfig.spec.json` unconditionally include every `.ts` file under `src/themes`.
 */
declare module '@dspace/config/app-config.interface' {
  interface AppConfig {
    itemPage?: ItemPageConfig;
  }
}
