import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Context } from '@dspace/core/shared/context.model';
import { Item } from '@dspace/core/shared/item.model';
import { ViewMode } from '@dspace/core/shared/view-mode.model';
import { TranslateModule } from '@ngx-translate/core';

import { ThemedMediaViewerComponent } from '../../../../../../../app/item-page/media-viewer/themed-media-viewer.component';
import { MiradorViewerComponent } from '../../../../../../../app/item-page/mirador-viewer/mirador-viewer.component';
import { ThemedFileSectionComponent } from '../../../../../../../app/item-page/simple/field-components/file-section/themed-file-section.component';
import { ThemedItemPageTitleFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { UntypedItemComponent as BaseComponent } from '../../../../../../../app/item-page/simple/item-types/untyped-item/untyped-item.component';
import { AttachmentSectionComponent } from '../../../../../../../app/shared/bitstream-attachment/section/attachment-section.component';
import { DsoEditMenuComponent } from '../../../../../../../app/shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { MetadataFieldWrapperComponent } from '../../../../../../../app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { listableObjectComponent } from '../../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { ThemedResultsBackButtonComponent } from '../../../../../../../app/shared/results-back-button/themed-results-back-button.component';
import { ThemedThumbnailComponent } from '../../../../../../../app/thumbnail/themed-thumbnail.component';
import { environment } from '../../../../../../../environments/environment';
import { resolveItemPageLayout } from '../../../../../../qulto/app/item-page/simple/field-components/dynamic/item-page-config.util';
import { ItemPageFieldConfig } from '../../../../../../qulto/app/item-page/simple/field-components/dynamic/item-page-field.config';
import { ItemPageFieldListComponent } from '../../../../../../qulto/app/item-page/simple/field-components/dynamic/item-page-field-list.component';

/**
 * SZEREP untyped item page — the left/right column field list is config-driven via
 * `config.yml`'s root-level `itemPage.Item` key (see resolveItemPageLayout / ds-item-page-field-list).
 * Only the chrome (title, thumbnail/media-viewer, file-section, edit menu, full-page link)
 * is still hardcoded in the template below.
 */
@listableObjectComponent(Item, ViewMode.StandalonePage, Context.Any, 'szerep')
@Component({
  selector: 'ds-untyped-item',
  styleUrls: ['../../../../../../../app/item-page/simple/item-types/untyped-item/untyped-item.component.scss'],
  templateUrl: './untyped-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    AttachmentSectionComponent,
    DsoEditMenuComponent,
    ItemPageFieldListComponent,
    MetadataFieldWrapperComponent,
    MiradorViewerComponent,
    RouterLink,
    ThemedFileSectionComponent,
    ThemedItemPageTitleFieldComponent,
    ThemedMediaViewerComponent,
    ThemedResultsBackButtonComponent,
    ThemedThumbnailComponent,
    TranslateModule,
  ],
})
export class UntypedItemComponent extends BaseComponent {
  leftSideFields: ItemPageFieldConfig[] = [];

  rightSideFields: ItemPageFieldConfig[] = [];

  override ngOnInit(): void {
    super.ngOnInit();
    const layout = resolveItemPageLayout(environment, 'Item');
    this.leftSideFields = layout.leftSide ?? [];
    this.rightSideFields = layout.rightSide ?? [];
  }
}
