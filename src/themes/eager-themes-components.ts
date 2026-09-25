// import { COMPONENTS as CUSTOM_THEME_EAGER_COMPONENTS } from './custom/eager-theme-components';
import { COMPONENTS as DSPACE_THEME_EAGER_COMPONENTS } from './dspace/eager-theme-components';
import { COMPONENTS as DSPACE_LIFEBELT_THEME_EAGER_COMPONENTS } from './dspace-lifebelt/eager-theme-components';
import { COMPONENTS as KJK_THEME_EAGER_COMPONENTS } from './kjk/eager-theme-components';
import { COMPONENTS as PTE_THEME_EAGER_COMPONENTS } from './pte/eager-theme-components';
import { COMPONENTS as QULTO_THEME_EAGER_COMPONENTS } from './qulto/eager-theme-components';
import { COMPONENTS as SZEREP_THEME_EAGER_COMPONENTS } from './szerep/eager-theme-components';

/**
 * This list bundles the eager components from all the enable themes.
 * Eager components are components that are present on every page (to speed up initial loading)
 * and entry components (to ensure their decorators get picked up).
 *
 * Themes that aren't in use should not be imported here, so they don't take up unnecessary space in the main bundle.
 */
export const EAGER_THEME_COMPONENTS = [
  // ...CUSTOM_THEME_EAGER_COMPONENTS,
  ...DSPACE_THEME_EAGER_COMPONENTS,
  ...DSPACE_LIFEBELT_THEME_EAGER_COMPONENTS,
  ...KJK_THEME_EAGER_COMPONENTS,
  ...PTE_THEME_EAGER_COMPONENTS,
  ...QULTO_THEME_EAGER_COMPONENTS,
  ...SZEREP_THEME_EAGER_COMPONENTS,
];
