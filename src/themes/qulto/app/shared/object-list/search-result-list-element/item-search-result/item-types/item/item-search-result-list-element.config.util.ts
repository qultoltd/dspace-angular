import { AppConfig } from '@dspace/config/app-config.interface';

import {
  SearchResultAbstractConfig,
  SearchResultAuthorsConfig,
  SearchResultGroupConfig,
} from './item-search-result-list-element.config';

const DEFAULT_GROUP: SearchResultGroupConfig = {
  fields: [
    { fields: ['dc.publisher'], cssClass: 'item-list-publisher' },
    { fields: ['dc.date.issued'], cssClass: 'item-list-date' },
  ],
  separator: ', ',
  prefix: '(',
  suffix: ')',
};

// Empty by default — this is a purely additive slot, nothing was hardcoded here before.
// The leading space in `prefix` separates it from the group/authors content that precedes it.
const DEFAULT_INLINE_FIELDS: SearchResultGroupConfig = {
  fields: [],
  separator: ' ',
  prefix: ' ',
  suffix: '',
};

const DEFAULT_AUTHORS: SearchResultAuthorsConfig = {
  cssClass: 'item-list-authors',
  separator: '; ',
};

const DEFAULT_ABSTRACT: SearchResultAbstractConfig = {
  fields: ['dc.description.abstract'],
  cssClass: 'item-list-abstract',
  minLines: 3,
};

export interface ResolvedItemSearchResultListElementConfig {
  group: SearchResultGroupConfig;
  inlineFields: SearchResultGroupConfig;
  authors: SearchResultAuthorsConfig;
  abstract: SearchResultAbstractConfig;
}

/**
 * Resolve the item-search-result-list-element field config, falling back to the layout the
 * base DSpace template previously hardcoded (publisher/date group, authors, abstract) for
 * whichever parts `config.yml`'s `itemSearchResultListElement` key doesn't set.
 */
export function resolveItemSearchResultListElementConfig(
  config: Pick<AppConfig, 'itemSearchResultListElement'>,
): ResolvedItemSearchResultListElementConfig {
  return {
    group: config.itemSearchResultListElement?.group ?? DEFAULT_GROUP,
    inlineFields: config.itemSearchResultListElement?.inlineFields ?? DEFAULT_INLINE_FIELDS,
    authors: config.itemSearchResultListElement?.authors ?? DEFAULT_AUTHORS,
    abstract: config.itemSearchResultListElement?.abstract ?? DEFAULT_ABSTRACT,
  };
}
