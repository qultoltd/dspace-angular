import { PublicationComponent } from './app/item-page/simple/item-types/publication/publication.component';

/**
 * KJK theme listable components.
 * The Publication component is overridden to show `isPartOf` AND `hasPart`
 * relationships — used for hierarchical record structures in KJK's digital
 * collections (e.g. a volume containing individual chapters/documents).
 */
export const LISTABLE_COMPONENTS = [
  PublicationComponent,
];
