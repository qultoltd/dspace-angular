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
import { ViewMode } from 'src/app/core/shared/view-mode.model';
import { CollectionsComponent } from 'src/app/item-page/field-components/collections/collections.component';
import { ThemedMediaViewerComponent } from 'src/app/item-page/media-viewer/themed-media-viewer.component';
import { MiradorViewerComponent } from 'src/app/item-page/mirador-viewer/mirador-viewer.component';
import { ThemedFileSectionComponent } from 'src/app/item-page/simple/field-components/file-section/themed-file-section.component';
import { ItemPageAbstractFieldComponent } from 'src/app/item-page/simple/field-components/specific-field/abstract/item-page-abstract-field.component';
import { ItemPageDateFieldComponent } from 'src/app/item-page/simple/field-components/specific-field/date/item-page-date-field.component';
import { GenericItemPageFieldComponent } from '../../field-components/specific-field/generic/generic-item-page-field.component';
import { ItemPageUriFieldComponent } from 'src/app/item-page/simple/field-components/specific-field/uri/item-page-uri-field.component';
import { ItemComponent } from 'src/app/item-page/simple/item-types/shared/item.component';
import { ThemedMetadataRepresentationListComponent } from 'src/app/item-page/simple/metadata-representation-list/themed-metadata-representation-list.component';
import { DsoEditMenuComponent } from 'src/app/shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { MetadataFieldWrapperComponent } from 'src/app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { listableObjectComponent } from 'src/app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { ThemedResultsBackButtonComponent } from 'src/app/shared/results-back-button/themed-results-back-button.component';
import { ThemedThumbnailComponent } from 'src/app/thumbnail/themed-thumbnail.component';

import { ElteRelatedItemsComponent } from '../../elte-related-items/elte-related-items.component';
import { ThemedItemPageTitleFieldComponent } from '../../field-components/specific-field/title/themed-item-page-field.component';

@listableObjectComponent('LearningObject', ViewMode.StandalonePage)
@listableObjectComponent('FieldOfScience', ViewMode.StandalonePage)
@listableObjectComponent('FieldOfStudy', ViewMode.StandalonePage)
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

  hasAnyMeta(keys: string[]): boolean {
    if (!this.object) { return false; }
    return keys.some(k => !!this.object.firstMetadataValue(k));
  }

  readonly metaBeforeFirst = [
    'education.educationlevel',
    'education.course',
    'education.schoolsubject',
    'education.fieldofscience',
    'education.fieldofstudy'
  ];

  readonly metaBetweenDividers = [
    'dc.type',
    'education.teachingmethod',
    'dc.format',
    'dc.format.isresponsive',
    'dc.format.isaccessible',
  ];

  readonly metaAfterSecond = [
    'education.accesslevel',
    'dc.rights.license',
    'dc.rights',
  ];

}
