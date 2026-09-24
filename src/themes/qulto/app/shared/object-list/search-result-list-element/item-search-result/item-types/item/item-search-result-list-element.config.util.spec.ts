import { resolveItemSearchResultListElementConfig } from './item-search-result-list-element.config.util';

describe('resolveItemSearchResultListElementConfig', () => {
  it('falls back to the default publisher/date/authors/abstract layout when unconfigured', () => {
    const resolved = resolveItemSearchResultListElementConfig({});
    expect(resolved.group.fields).toEqual([
      { fields: ['dc.publisher'], cssClass: 'item-list-publisher' },
      { fields: ['dc.date.issued'], cssClass: 'item-list-date' },
    ]);
    expect(resolved.inlineFields).toEqual({ fields: [], separator: ' ', prefix: ' ', suffix: '' });
    expect(resolved.authors).toEqual({ cssClass: 'item-list-authors', separator: '; ' });
    expect(resolved.abstract).toEqual({
      fields: ['dc.description.abstract'],
      cssClass: 'item-list-abstract',
      minLines: 3,
    });
  });

  it('uses the configured group/inlineFields/authors/abstract when set', () => {
    const group = { fields: [{ fields: ['dc.type'], cssClass: 'item-list-type' }] };
    const inlineFields = { fields: [{ fields: ['dc.description.version'], cssClass: 'item-list-version' }] };
    const authors = { cssClass: 'my-authors', separator: ', ' };
    const abstract = { fields: ['dc.description'], cssClass: 'my-abstract', minLines: 5 };
    const resolved = resolveItemSearchResultListElementConfig({
      itemSearchResultListElement: { group, inlineFields, authors, abstract },
    });
    expect(resolved.group).toBe(group);
    expect(resolved.inlineFields).toBe(inlineFields);
    expect(resolved.authors).toBe(authors);
    expect(resolved.abstract).toBe(abstract);
  });

  it('resolves each of group/inlineFields/authors/abstract independently when only one is configured', () => {
    const authors = { cssClass: 'my-authors', separator: ', ' };
    const resolved = resolveItemSearchResultListElementConfig({
      itemSearchResultListElement: { authors },
    });
    expect(resolved.authors).toBe(authors);
    expect(resolved.group.prefix).toBe('(');
    expect(resolved.inlineFields.fields).toEqual([]);
    expect(resolved.abstract.cssClass).toBe('item-list-abstract');
  });
});
