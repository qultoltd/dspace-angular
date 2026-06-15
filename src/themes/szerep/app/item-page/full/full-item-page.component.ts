import {
  AsyncPipe,
  KeyValuePipe,
  Location,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
} from '@angular/router';
import { NotifyInfoService } from '@dspace/core/coar-notify/notify-info/notify-info.service';
import { AuthorizationDataService } from '@dspace/core/data/feature-authorization/authorization-data.service';
import { ItemDataService } from '@dspace/core/data/item-data.service';
import { SignpostingDataService } from '@dspace/core/data/signposting-data.service';
import { LinkHeadService } from '@dspace/core/services/link-head.service';
import { ServerResponseService } from '@dspace/core/services/server-response.service';
import {
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

import { ThemedItemAlertsComponent } from '../../../../../app/item-page/alerts/themed-item-alerts.component';
import { CollectionsComponent } from '../../../../../app/item-page/field-components/collections/collections.component';
import { ThemedFullFileSectionComponent } from '../../../../../app/item-page/full/field-components/file-section/themed-full-file-section.component';
import { FullItemPageComponent as BaseComponent } from '../../../../../app/item-page/full/full-item-page.component';
import { ThemedItemPageTitleFieldComponent } from '../../../../../app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { ItemVersionsComponent } from '../../../../../app/item-page/versions/item-versions.component';
import { ItemVersionsNoticeComponent } from '../../../../../app/item-page/versions/notice/item-versions-notice.component';
import { fadeInOut } from '../../../../../app/shared/animations/fade';
import { DsoEditMenuComponent } from '../../../../../app/shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { ErrorComponent } from '../../../../../app/shared/error/error.component';
import { ThemedLoadingComponent } from '../../../../../app/shared/loading/themed-loading.component';
import { VarDirective } from '../../../../../app/shared/utils/var.directive';

/**
 * SZEREP full item page — identical to the base, but uses a local template that
 * translates the metadata field keys in the table view. The labels come from the
 * szerep i18n (e.g. dc.title → "Cím"); the base template shows the raw keys.
 */
@Component({
  selector: 'ds-themed-full-item-page',
  styleUrls: ['../../../../../app/item-page/full/full-item-page.component.scss'],
  templateUrl: './full-item-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOut],
  imports: [
    AsyncPipe,
    CollectionsComponent,
    DsoEditMenuComponent,
    ErrorComponent,
    ItemVersionsComponent,
    ItemVersionsNoticeComponent,
    KeyValuePipe,
    RouterLink,
    ThemedFullFileSectionComponent,
    ThemedItemAlertsComponent,
    ThemedItemPageTitleFieldComponent,
    ThemedLoadingComponent,
    TranslateModule,
    VarDirective,
  ],
})
export class FullItemPageComponent extends BaseComponent {
  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected items: ItemDataService,
    protected authorizationService: AuthorizationDataService,
    protected _location: Location,
    protected responseService: ServerResponseService,
    protected signpostingDataService: SignpostingDataService,
    protected linkHeadService: LinkHeadService,
    protected notifyInfoService: NotifyInfoService,
    @Inject(PLATFORM_ID) protected platformId: string,
    protected translate: TranslateService,
  ) {
    super(route, router, items, authorizationService, _location, responseService, signpostingDataService, linkHeadService, notifyInfoService, platformId);
  }

  /**
   * Returns the translation for the given key, or an empty string if no translation exists.
   * @param key The metadata key to translate.
   */
  getTranslation(key: string): string {
    const translation = this.translate.instant(key);
    return translation === key ? '' : translation;
  }
}
