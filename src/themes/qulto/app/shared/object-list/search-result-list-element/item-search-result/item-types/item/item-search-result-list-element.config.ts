import { Config } from '@dspace/config/config.interface';

/**
 * A single inline metadata field rendered as `<span [class]="cssClass" [dsMetadata]="...">`
 * within the search-result list element's subtitle line.
 */
export interface SearchResultInlineFieldConfig extends Config {
  fields: string[];
  cssClass?: string;
}

/**
 * An ordered group of inline fields (e.g. publisher + date). Only fields that actually have
 * a value are rendered, joined by `separator`, and the whole group is wrapped in
 * `prefix`/`suffix` whenever at least one field is present.
 */
export interface SearchResultGroupConfig extends Config {
  fields: SearchResultInlineFieldConfig[];
  separator?: string;
  prefix?: string;
  suffix?: string;
}

/**
 * Styling for the authors block. Which metadata fields count as "author" is controlled by
 * the existing `searchResult.authorMetadata` config — this only covers presentation.
 */
export interface SearchResultAuthorsConfig extends Config {
  cssClass?: string;
  separator?: string;
}

export interface SearchResultAbstractConfig extends SearchResultInlineFieldConfig {
  minLines?: number;
}

/**
 * Root `config.yml` `itemSearchResultListElement` key. Applies to every entity type this
 * component renders (Publication and generic Item search results share one layout) —
 * unlike the item-page field lists, there is no per-entity-type keying here.
 */
export interface ItemSearchResultListElementConfig extends Config {
  group?: SearchResultGroupConfig;
  /**
   * Freestanding inline fields, rendered the same way as `group` (same shape/logic — only
   * present fields show, joined by `separator`) but without `group`'s parenthesised styling
   * by default. Use this to add a new field to the subtitle line without folding it into the
   * publisher/date-style `group` cluster.
   */
  inlineFields?: SearchResultGroupConfig;
  authors?: SearchResultAuthorsConfig;
  abstract?: SearchResultAbstractConfig;
}

/**
 * Augments the core `AppConfig` from within the qulto theme (rather than editing
 * `src/config/app-config.interface.ts` directly) — `tsconfig.app.json`/`tsconfig.spec.json`
 * unconditionally include every `.ts` file under `src/themes`, so this is always picked up.
 */
declare module '@dspace/config/app-config.interface' {
  interface AppConfig {
    itemSearchResultListElement?: ItemSearchResultListElementConfig;
  }
}
