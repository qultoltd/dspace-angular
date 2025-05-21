import {
  Component,
  Input,
} from '@angular/core';

import { Item } from '../../../../../../../../app/core/shared/item.model';
import { ThemedComponent } from '../../../../../../../../app/shared/theme-support/themed.component';
import { ItemPageTitleFieldComponent } from './item-page-title-field.component';

/**
 * Themed wrapper for {@link ItemPageTitleFieldComponent}
 */
@Component({
  selector: 'ds-item-page-title-field',
  styleUrls: [],
  templateUrl: './themed.component.html',
  standalone: true,
  imports: [ItemPageTitleFieldComponent],
})
export class ThemedItemPageTitleFieldComponent extends ThemedComponent<ItemPageTitleFieldComponent> {

  protected inAndOutputNames: (keyof ItemPageTitleFieldComponent & keyof this)[] = [
    'item',
    'showType',
  ];

  @Input() item: Item;
  @Input() showType: boolean;

  protected getComponentName(): string {
    return 'ItemPageTitleFieldComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(`./item-page-title-field.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import('./item-page-title-field.component');
  }
}
