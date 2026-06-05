// import { LISTABLE_COMPONENTS as CUSTOM_LISTABLE_COMPONENTS } from './custom/lazy-listable-components';
import { LISTABLE_COMPONENTS as DSPACE_LISTABLE_COMPONENTS } from './dspace/lazy-listable-components';
import { LISTABLE_COMPONENTS as DSPACE_LIFEBELT_LISTABLE_COMPONENTS } from './dspace-lifebelt/lazy-listable-components';
import { LISTABLE_COMPONENTS as KJK_LISTABLE_COMPONENTS } from './kjk/lazy-listable-components';
import { LISTABLE_COMPONENTS as PTE_LISTABLE_COMPONENTS } from './pte/lazy-listable-components';
import { LISTABLE_COMPONENTS as QULTO_LISTABLE_COMPONENTS } from './qulto/lazy-listable-components';
import { LISTABLE_COMPONENTS as SZEREP_LISTABLE_COMPONENTS } from './szerep/lazy-listable-components';

/**
 * This list bundles all the listable components from all the enabled themes.
 * Listable components are components that use the @listableObjectComponent decorator
 *
 * Themes that aren't in use should not be imported here, so they don't take up unnecessary space in the main bundle.
 */
export const THEME_LISTABLE_COMPONENTS = [
  // ...CUSTOM_LISTABLE_COMPONENTS,
  ...DSPACE_LISTABLE_COMPONENTS,
  ...DSPACE_LIFEBELT_LISTABLE_COMPONENTS,
  ...KJK_LISTABLE_COMPONENTS,
  ...PTE_LISTABLE_COMPONENTS,
  ...QULTO_LISTABLE_COMPONENTS,
  ...SZEREP_LISTABLE_COMPONENTS,
];
