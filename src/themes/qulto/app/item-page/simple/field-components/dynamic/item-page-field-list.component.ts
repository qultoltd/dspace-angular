import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Type,
} from '@angular/core';
import { Item } from '@dspace/core/shared/item.model';

import { ItemPageFieldConfig } from './item-page-field.config';
import { ITEM_PAGE_FIELD_CONTAINER_REGISTRY } from './item-page-field-container.registry';

/**
 * Renders an ordered list of item-page metadata/relation fields declared in `config.yml`
 * (`ItemPageFieldConfig[]`, see `resolveItemPageLayout`). Each entry's `container` key is
 * resolved to a component via `ITEM_PAGE_FIELD_CONTAINER_REGISTRY`; every other property on
 * the entry is passed through as that component's input.
 */
@Component({
  selector: 'ds-item-page-field-list',
  templateUrl: './item-page-field-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgComponentOutlet,
  ],
})
export class ItemPageFieldListComponent {
  @Input() item: Item;

  @Input() configs: ItemPageFieldConfig[] = [];

  /**
   * Gate for the `geospatial` container. The base item-type components already compute
   * `geospatialItemPageFieldsEnabled` from `environment.geospatialMapViewer`; callers pass
   * that through here instead of this component reading `environment` itself, so it stays
   * a plain config-driven renderer.
   */
  @Input() geospatialEnabled = true;

  get visibleConfigs(): ItemPageFieldConfig[] {
    return this.configs.filter((cfg) =>
      !!ITEM_PAGE_FIELD_CONTAINER_REGISTRY[cfg.container] &&
      (cfg.container !== 'geospatial' || this.geospatialEnabled),
    );
  }

  componentFor(cfg: ItemPageFieldConfig): Type<any> {
    return ITEM_PAGE_FIELD_CONTAINER_REGISTRY[cfg.container].component;
  }

  /**
   * Only forwards explicitly-set config properties: passing `undefined` through
   * `ngComponentOutletInputs` would overwrite the target component's own default value
   * (e.g. `separator`) instead of leaving it alone.
   */
  inputsFor(cfg: ItemPageFieldConfig): Record<string, unknown> {
    const { container, ...rest } = cfg;
    const inputs: Record<string, unknown> = {
      [ITEM_PAGE_FIELD_CONTAINER_REGISTRY[container].itemInputName]: this.item,
    };
    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined) {
        inputs[key] = value;
      }
    }
    return inputs;
  }
}
