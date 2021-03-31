import { URLCombiner } from '../core/url-combiner/url-combiner';
import { Item } from '../core/shared/item.model';
import { isNotEmpty } from '../shared/empty.util';

export const ITEM_MODULE_PATH = 'items';

export function getItemModuleRoute() {
  return `/${ITEM_MODULE_PATH}`;
}

/**
 * Get the route to an item's page
 * Depending on the item's relationship type, the route will either start with /items or /entities
 * @param item  The item to retrieve the route for
 */
export function getItemPageRoute(item: Item) {
  const type = item.firstMetadataValue('relationship.type');
  return getEntityPageRoute(type, item.uuid);
}

export function getItemEditRoute(item: Item) {
  return new URLCombiner(getItemPageRoute(item), ITEM_EDIT_PATH).toString();
}

export function getEntityPageRoute(entityType: string, itemId: string) {
  if (isNotEmpty(entityType)) {
    return new URLCombiner('/entities', encodeURIComponent(entityType.toLowerCase()), itemId).toString();
  } else {
    return new URLCombiner(getItemModuleRoute(), itemId).toString();
  }
}

export function getEntityEditRoute(entityType: string, itemId: string) {
  return new URLCombiner(getEntityPageRoute(entityType, itemId), ITEM_EDIT_PATH).toString();
}

export const ITEM_EDIT_PATH = 'edit';
export const UPLOAD_BITSTREAM_PATH = 'bitstreams/new';
export const ITEM_COPY_PATH = 'copy';
