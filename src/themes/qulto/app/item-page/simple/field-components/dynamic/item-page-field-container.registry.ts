import { Type } from '@angular/core';

import { CollectionsComponent } from '../../../../../../../app/item-page/field-components/collections/collections.component';
import { ItemPageAbstractFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/abstract/item-page-abstract-field.component';
import { ItemPageCcLicenseFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/cc-license/item-page-cc-license-field.component';
import { ItemPageDateFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/date/item-page-date-field.component';
import { GenericItemPageFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { GeospatialItemPageFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/geospatial/geospatial-item-page-field.component';
import { ItemPageLicenseFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/license/item-page-license-field.component';
import { ItemPageUriFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/uri/item-page-uri-field.component';
import { ThemedMetadataRepresentationListComponent } from '../../../../../../../app/item-page/simple/metadata-representation-list/themed-metadata-representation-list.component';
import { TabbedRelatedEntitiesSearchComponent } from '../../../../../../../app/item-page/simple/related-entities/tabbed-related-entities-search/tabbed-related-entities-search.component';
import { RelatedItemsComponent } from '../../../../../../../app/item-page/simple/related-items/related-items-component';
import { ItemPageDoiFieldComponent } from '../specific-field/doi/item-page-doi-field.component';

/**
 * Maps an `ItemPageFieldConfig.container` key (from `config.yml`) to the component it renders
 * and the `@Input()` name the item/parent-item is bound to — most containers take `item`, but
 * the two relation-list containers take `parentItem`.
 */
export interface ItemPageFieldContainerDef {
  component: Type<any>;
  itemInputName: 'item' | 'parentItem';
}

export const ITEM_PAGE_FIELD_CONTAINER_REGISTRY: Record<string, ItemPageFieldContainerDef> = {
  'generic': { component: GenericItemPageFieldComponent, itemInputName: 'item' },
  'uri': { component: ItemPageUriFieldComponent, itemInputName: 'item' },
  'abstract': { component: ItemPageAbstractFieldComponent, itemInputName: 'item' },
  'date': { component: ItemPageDateFieldComponent, itemInputName: 'item' },
  'license': { component: ItemPageLicenseFieldComponent, itemInputName: 'item' },
  'cc-license': { component: ItemPageCcLicenseFieldComponent, itemInputName: 'item' },
  'doi': { component: ItemPageDoiFieldComponent, itemInputName: 'item' },
  'geospatial': { component: GeospatialItemPageFieldComponent, itemInputName: 'item' },
  'collections': { component: CollectionsComponent, itemInputName: 'item' },
  'metadata-representation-list': { component: ThemedMetadataRepresentationListComponent, itemInputName: 'parentItem' },
  'related-items': { component: RelatedItemsComponent, itemInputName: 'parentItem' },
  'tabbed-related-entities-search': { component: TabbedRelatedEntitiesSearchComponent, itemInputName: 'item' },
};
