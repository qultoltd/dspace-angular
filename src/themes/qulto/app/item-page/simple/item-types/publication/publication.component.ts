import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { ThemedMediaViewerComponent } from '../../../../../../../app/item-page/media-viewer/themed-media-viewer.component';
import { MiradorViewerComponent } from '../../../../../../../app/item-page/mirador-viewer/mirador-viewer.component';
import { ThemedFileSectionComponent } from '../../../../../../../app/item-page/simple/field-components/file-section/themed-file-section.component';
import { ItemComponent } from '../../../../../../../app/item-page/simple/item-types/shared/item.component';
import { AttachmentSectionComponent } from '../../../../../../../app/shared/bitstream-attachment/section/attachment-section.component';
import { DsoEditMenuComponent } from '../../../../../../../app/shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { MetadataFieldWrapperComponent } from '../../../../../../../app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { listableObjectComponent } from '../../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { ThemedResultsBackButtonComponent } from '../../../../../../../app/shared/results-back-button/themed-results-back-button.component';
import { ThemedThumbnailComponent } from '../../../../../../../app/thumbnail/themed-thumbnail.component';
import { environment } from '../../../../../../../environments/environment';
import { resolveItemPageLayout } from '../../field-components/dynamic/item-page-config.util';
import { ItemPageFieldConfig } from '../../field-components/dynamic/item-page-field.config';
import { ItemPageFieldListComponent } from '../../field-components/dynamic/item-page-field-list.component';
import { ThemedItemPageTitleFieldComponent } from '../../field-components/specific-field/title/themed-item-page-field.component';

/**
 * Qulto publication item page — the left/right column field list is config-driven via
 * `config.yml`'s root-level `itemPage.Publication` key (see resolveItemPageLayout /
 * ds-item-page-field-list). Only the chrome (title, thumbnail/media-viewer, file-section,
 * edit menu, full-page link) is still hardcoded in the template below.
 */
@listableObjectComponent('Publication', ViewMode.StandalonePage, Context.Any, 'qulto')
@Component({
  selector: 'ds-publication',
  styleUrls: ['./publication.component.scss'],
  templateUrl: './publication.component.html',
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
export class PublicationComponent extends ItemComponent {
  leftSideFields: ItemPageFieldConfig[] = [];

  rightSideFields: ItemPageFieldConfig[] = [];

  fullWidthFields: ItemPageFieldConfig[] = [];

  override ngOnInit(): void {
    super.ngOnInit();
    const layout = resolveItemPageLayout(environment, 'Publication');
    this.leftSideFields = layout.leftSide ?? [];
    this.rightSideFields = layout.rightSide ?? [];
    this.fullWidthFields = layout.fullWidth ?? [];
  }
}
