import {
  AsyncPipe,
  NgClass,
} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Context } from '@dspace/core/shared/context.model';
import { ItemSearchResult } from '@dspace/core/shared/object-collection/item-search-result.model';
import { ViewMode } from '@dspace/core/shared/view-mode.model';

import { MetadataDirective } from '../../../../../../../../../app/shared/metadata.directive';
import { MetadataLinkViewComponent } from '../../../../../../../../../app/shared/metadata-link-view/metadata-link-view.component';
import { ThemedBadgesComponent } from '../../../../../../../../../app/shared/object-collection/shared/badges/themed-badges.component';
import { listableObjectComponent } from '../../../../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { ItemSearchResultListElementComponent as BaseComponent } from '../../../../../../../../../app/shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component';
import { TruncatableComponent } from '../../../../../../../../../app/shared/truncatable/truncatable.component';
import { TruncatablePartComponent } from '../../../../../../../../../app/shared/truncatable/truncatable-part/truncatable-part.component';
import { ThemedThumbnailComponent } from '../../../../../../../../../app/thumbnail/themed-thumbnail.component';
import { environment } from '../../../../../../../../../environments/environment';
import {
  SearchResultGroupConfig,
  SearchResultInlineFieldConfig,
} from './item-search-result-list-element.config';
import { resolveItemSearchResultListElementConfig } from './item-search-result-list-element.config.util';

/**
 * Qulto search-result list element — the publisher/date group, authors block styling, and
 * abstract field are config-driven via `config.yml`'s root-level `itemSearchResultListElement`
 * key (see resolveItemSearchResultListElementConfig). Chrome (thumbnail, badges, title,
 * truncation) is unchanged from the base template.
 */
@listableObjectComponent('PublicationSearchResult', ViewMode.ListElement, Context.Any, 'qulto')
@listableObjectComponent(ItemSearchResult, ViewMode.ListElement, Context.Any, 'qulto')
@Component({
  selector: 'ds-item-search-result-list-element',
  styleUrls: ['../../../../../../../../../app/shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component.scss'],
  templateUrl: './item-search-result-list-element.component.html',
  imports: [
    AsyncPipe,
    MetadataDirective,
    MetadataLinkViewComponent,
    NgClass,
    RouterLink,
    ThemedBadgesComponent,
    ThemedThumbnailComponent,
    TruncatableComponent,
    TruncatablePartComponent,
  ],
})
export class ItemSearchResultListElementComponent extends BaseComponent {
  readonly config = resolveItemSearchResultListElementConfig(environment);

  /**
   * Fields that actually have a value for the current item, for either `group` or
   * `inlineFields` — both share the same "only show what's present, joined by separator"
   * shape, they only differ in their default prefix/suffix.
   */
  getPresentFields(fieldsConfig: SearchResultGroupConfig): SearchResultInlineFieldConfig[] {
    return fieldsConfig.fields.filter((f) => !!this.firstMetadataValue(f.fields));
  }
}
