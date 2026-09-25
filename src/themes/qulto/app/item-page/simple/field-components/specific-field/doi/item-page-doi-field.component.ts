import {
  Component,
  Input,
} from '@angular/core';
import { Item } from '@dspace/core/shared/item.model';
import { MetadataValue } from '@dspace/core/shared/metadata.models';
import { TranslateModule } from '@ngx-translate/core';

import { MetadataFieldWrapperComponent } from '../../../../../../../../app/shared/metadata-field-wrapper/metadata-field-wrapper.component';

/**
 * Renders `dc.identifier.doi` values as clickable links, normalising bare DOI
 * identifiers (e.g. `10.1234/example`) to `https://doi.org/…` so that DOIs stored
 * without a protocol prefix still resolve correctly.
 *
 * Full HTTP(S) URLs are passed through unchanged.
 */
@Component({
  selector: 'ds-item-page-doi-field',
  templateUrl: './item-page-doi-field.component.html',
  imports: [
    MetadataFieldWrapperComponent,
    TranslateModule,
  ],
})
export class ItemPageDoiFieldComponent {

  /** The item whose DOI metadata is displayed */
  @Input() item: Item;

  /** i18n key for the field label */
  @Input() label = 'item.page.doi';

  /** HTML string placed between multiple DOI values */
  @Input() separator = ' ';

  get doiValues(): MetadataValue[] {
    return this.item?.allMetadata(['dc.identifier.doi']) ?? [];
  }

  /**
   * Convert a raw DOI metadata value to a fully-qualified URL:
   *  - `https://doi.org/…` / `http://dx.doi.org/…`  → returned as-is
   *  - `10.xxxx/…` (bare DOI)                        → `https://doi.org/10.xxxx/…`
   *  - anything else                                 → returned as-is
   */
  normalizeDoiUrl(value: string): string {
    if (/^https?:\/\//i.test(value)) {
      return value;
    }
    if (/^10\.\d{4,}/.test(value)) {
      return `https://doi.org/${value}`;
    }
    return value;
  }
}
