import { UntypedItemComponent } from './app/item-page/simple/item-types/untyped-item/untyped-item.component';
import { ItemSearchResultListElementComponent } from './app/shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component';

/**
 * Add components that use the @listableObjectComponent decorator here.
 * This will ensure that the decorators get picked up when the app loads
 *
 * Removed: CommunityListElementComponent — now inherited from qulto via the
 * `extends: qulto` theme chain. The community icon and hover colour are
 * controlled by --ds-community-icon / --ds-community-hover-bg CSS variables
 * set in styles/_theme_css_variable_overrides.scss.
 */
export const LISTABLE_COMPONENTS = [
  ItemSearchResultListElementComponent,
  UntypedItemComponent,
];
