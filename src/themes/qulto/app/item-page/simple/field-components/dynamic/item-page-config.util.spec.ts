import { resolveItemPageLayout } from './item-page-config.util';

describe('resolveItemPageLayout', () => {
  it('returns an empty layout when itemPage is not configured', () => {
    expect(resolveItemPageLayout({}, 'Publication')).toEqual({});
  });

  it('returns an empty layout when the entity type is not configured', () => {
    const config = { itemPage: { Item: { leftSide: [{ container: 'date' }] } } };
    expect(resolveItemPageLayout(config, 'Publication')).toEqual({});
  });

  it('returns the configured layout for the entity type', () => {
    const layout = { leftSide: [{ container: 'date' }], rightSide: [{ container: 'abstract' }] };
    expect(resolveItemPageLayout({ itemPage: { Item: layout } }, 'Item')).toEqual(layout);
  });
});
