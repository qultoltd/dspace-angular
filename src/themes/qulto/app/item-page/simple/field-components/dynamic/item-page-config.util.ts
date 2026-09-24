import { AppConfig } from '@dspace/config/app-config.interface';

import { ItemPageLayoutConfig } from './item-page-field.config';

/**
 * Look up the item-page field layout for one entity type from the root-level `itemPage`
 * config key. A deployment only ever runs one active theme, so there is no per-theme
 * nesting or `extends` chain to resolve here — just a direct config lookup.
 */
export function resolveItemPageLayout(config: Pick<AppConfig, 'itemPage'>, entityType: string): ItemPageLayoutConfig {
  return config.itemPage?.[entityType] ?? {};
}
