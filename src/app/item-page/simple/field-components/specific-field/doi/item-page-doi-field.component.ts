import { Component, Input } from '@angular/core';
import { Item } from '../../../../../core/shared/item.model';
import { ItemPageFieldComponent } from '../item-page-field.component';
import { MetadataDoiValuesComponent } from 'src/app/item-page/field-components/metadata-doi-values/metadata-doi-values.component';

/**
 * This component displays DOIs on a simple item page using the MetadataDoiValuesComponent.
 * It converts DOIs into clickable links, separators, and labels.
 */
@Component({
  selector: 'ds-item-page-doi-field',
  templateUrl: './item-page-doi-field.component.html',
  standalone: true,
  imports: [
    MetadataDoiValuesComponent,
  ],
})
export class ItemPageDoiFieldComponent extends ItemPageFieldComponent {
  /**
   * The item to display metadata for
   */
  @Input() item: Item;

  /**
   * Separator string between multiple DOIs
   * @type {string}
   */
  @Input() separator: string = ', ';

  /**
   * Metadata fields containing DOIs
   */
  @Input() fields: string[] = ['dc.identifier.doi'];

  /**
   * Label for the DOI field
   */
  @Input() label: string = 'item.page.doi';

  /**
   * Get metadata values for the provided fields
   */
  get doiValues() {
    return this.item?.allMetadata(this.fields) || [];
  }
}
