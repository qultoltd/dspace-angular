import {
  AsyncPipe,
  NgIf,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ViewMode } from '../../../../core/shared/view-mode.model';
import { DsoEditMenuComponent } from '../../../../shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { MetadataFieldWrapperComponent } from '../../../../shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { ThemedResultsBackButtonComponent } from '../../../../shared/results-back-button/themed-results-back-button.component';
import { ThemedThumbnailComponent } from '../../../../thumbnail/themed-thumbnail.component';
import { CollectionsComponent } from '../../../field-components/collections/collections.component';
import { ThemedMediaViewerComponent } from '../../../media-viewer/themed-media-viewer.component';
import { MiradorViewerComponent } from '../../../mirador-viewer/mirador-viewer.component';
import { ThemedFileSectionComponent } from '../../field-components/file-section/themed-file-section.component';
import { ItemPageAbstractFieldComponent } from '../../field-components/specific-field/abstract/item-page-abstract-field.component';
import { ItemPageDateFieldComponent } from '../../field-components/specific-field/date/item-page-date-field.component';
import { GenericItemPageFieldComponent } from '../../field-components/specific-field/generic/generic-item-page-field.component';
import { ThemedItemPageTitleFieldComponent } from '../../field-components/specific-field/title/themed-item-page-field.component';
import { ItemPageUriFieldComponent } from '../../field-components/specific-field/uri/item-page-uri-field.component';
import { ThemedMetadataRepresentationListComponent } from '../../metadata-representation-list/themed-metadata-representation-list.component';
import { ElteRelatedItemsComponent } from '../../elte-related-items/elte-related-items.component';
import { ItemComponent } from '../shared/item.component';

@listableObjectComponent('LearningObject', ViewMode.StandalonePage)
@listableObjectComponent('FieldOfScience', ViewMode.StandalonePage)
@listableObjectComponent('SchoolSubject', ViewMode.StandalonePage)
@listableObjectComponent('Course', ViewMode.StandalonePage)
@listableObjectComponent('Department', ViewMode.StandalonePage)
@listableObjectComponent('Institute', ViewMode.StandalonePage)
@listableObjectComponent('DoctoralSchool', ViewMode.StandalonePage)
@Component({
  selector: 'ds-learning-object',
  styleUrls: ['./learning-object.component.scss'],
  templateUrl: './learning-object.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, ThemedResultsBackButtonComponent, MiradorViewerComponent, ThemedItemPageTitleFieldComponent, DsoEditMenuComponent, MetadataFieldWrapperComponent, ThemedThumbnailComponent, ThemedMediaViewerComponent, ThemedFileSectionComponent, ItemPageDateFieldComponent, ThemedMetadataRepresentationListComponent, GenericItemPageFieldComponent, ElteRelatedItemsComponent, ItemPageAbstractFieldComponent, ItemPageUriFieldComponent, CollectionsComponent, RouterLink, AsyncPipe, TranslateModule],
})
export class LearningObjectComponent extends ItemComponent {

}
