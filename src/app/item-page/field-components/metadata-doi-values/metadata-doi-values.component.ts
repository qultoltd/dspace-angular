import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MetadataValue } from '../../../core/shared/metadata.models';
import { MetadataFieldWrapperComponent } from '../../../shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { MetadataValuesComponent } from '../metadata-values/metadata-values.component';

/**
 * This component renders DOIs into the `ds-metadata-field-wrapper` component as clickable links.
 * Each DOI is transformed into a valid URL (e.g., `https://doi.org/...`) and displayed with custom text if provided.
 */
@Component({
  selector: 'ds-metadata-doi-values',
  templateUrl: './metadata-doi-values.component.html',
  imports: [
    MetadataFieldWrapperComponent,
    TranslateModule,
    NgForOf,
    NgIf,
  ],
  standalone: true,
})
export class MetadataDoiValuesComponent extends MetadataValuesComponent {
  /**
   * The metadata values (DOIs) to display
   */
  @Input() mdValues: MetadataValue[];

  /**
   * The separator used between multiple DOIs
   */
  @Input() separator: string;

  /**
   * The label for this field
   */
  @Input() label: string;

  /**
   * Optional custom text for the DOI links
   * If undefined, the raw DOI value is displayed
   */
  @Input() linkText: string;

  /**
   * Converts a raw DOI value into a full URL
   * @param doi Raw DOI string (e.g., `10.1234/example.doi`)
   * @returns Full URL for the DOI (e.g., `https://doi.org/10.1234/example.doi`)
   */
  formatDoiUrl(doi: string): string {
    return `https://doi.org/${doi}`;
  }
}
