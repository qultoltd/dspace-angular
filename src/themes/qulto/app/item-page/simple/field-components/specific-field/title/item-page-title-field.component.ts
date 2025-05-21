import { NgIf } from '@angular/common';
import {
  Component,
  Input,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { DSONameService } from '../../../../../../../../app/core/breadcrumbs/dso-name.service';
import { Item } from '../../../../../../../../app/core/shared/item.model';

@Component({
  selector: 'ds-base-item-page-title-field',
  templateUrl: './item-page-title-field.component.html',
  standalone: true,
  imports: [NgIf, TranslateModule],
})
/**
 * This component is used for displaying the title (defined by the {@link DSONameService}) of an item
 */
export class ItemPageTitleFieldComponent {

  /**
   * The item to display metadata for
   */
  @Input() item: Item;
  @Input() showType: boolean;

  constructor(
    public dsoNameService: DSONameService,
  ) {
  }

}
