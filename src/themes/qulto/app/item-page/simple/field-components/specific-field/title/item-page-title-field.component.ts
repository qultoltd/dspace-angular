import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { DSONameService } from '../../../../../../../../app/core/breadcrumbs/dso-name.service';
import { Item } from '../../../../../../../../app/core/shared/item.model';
import { MetadataValue } from '../../../../../../../../app/core/shared/metadata.models';
import { MetadataDirective } from '../../../../../../../../app/shared/metadata.directive';

@Component({
  selector: 'ds-themed-item-page-title-field',
  templateUrl: './item-page-title-field.component.html',
  imports: [
    MetadataDirective,
    TranslateModule,
  ],
})
/**
 * Qulto item-title override — re-synced with the DS10 base (uses [dsMetadata] for
 * search-hit highlighting) but keeps the `showType` input to suppress the
 * entity-type prefix (e.g. "Publication: …") that the base renders by default.
 */
export class ItemPageTitleFieldComponent implements OnInit {

  /** The item to display metadata for */
  @Input() item: Item;

  /**
   * When false (default) the entity-type prefix (e.g. "Publication: …") is hidden.
   * Set to true in contexts where the type label is desired.
   */
  @Input() showType: boolean;

  nameMetadata: MetadataValue;

  constructor(
    public dsoNameService: DSONameService,
  ) {
  }

  ngOnInit() {
    const name = this.dsoNameService.getName(this.item);
    const language = this.dsoNameService.getNameLanguage(this.item);
    this.nameMetadata = Object.assign(new MetadataValue(), {
      value: name,
      language: language,
    });
  }

}
