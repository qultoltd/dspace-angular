import {
  AsyncPipe, NgClass, NgFor, NgIf, isPlatformBrowser,
} from '@angular/common';
import {
  Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { APP_CONFIG, AppConfig } from '../../../../config/app-config.interface';
import { RelationshipDataService } from '../../../core/data/relationship-data.service';
import { FindListOptions } from '../../../core/data/find-list-options.model';
import { PaginatedList } from '../../../core/data/paginated-list.model';
import { RemoteData } from '../../../core/data/remote-data';
import { Item } from '../../../core/shared/item.model';
import { ViewMode } from '../../../core/shared/view-mode.model';

import { ThemedLoadingComponent } from '../../../shared/loading/themed-loading.component';
import { MetadataFieldWrapperComponent } from '../../../shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { ListableObjectComponentLoaderComponent } from '../../../shared/object-collection/shared/listable-object/listable-object-component-loader.component';
import { VarDirective } from '../../../shared/utils/var.directive';
import { setPlaceHolderAttributes } from '../../../shared/utils/object-list-utils';
import { AbstractIncrementalListComponent } from '../abstract-incremental-list/abstract-incremental-list.component';

@Component({
  selector: 'ds-elte-related-items',
  styleUrls: ['./elte-related-items.component.scss'],
  templateUrl: './elte-related-items.component.html',
  standalone: true,
  imports: [
    MetadataFieldWrapperComponent,
    NgClass, NgFor, VarDirective,
    ListableObjectComponentLoaderComponent,
    NgIf, ThemedLoadingComponent, AsyncPipe, TranslateModule,
  ],
})
export class ElteRelatedItemsComponent
  extends AbstractIncrementalListComponent<Observable<RemoteData<PaginatedList<Item>>>>
  implements OnInit {

  @Input() parentItem!: Item;

  @Input() relationType!: string;

  @Input() incrementBy = 5;

  @Input() options = new FindListOptions();

  @Input() label!: string;

  viewMode = ViewMode.ListElement;

  private readonly fetchThumbnail = false;

  constructor(
    public relationshipService: RelationshipDataService,
    protected elementRef: ElementRef,
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
    @Inject(PLATFORM_ID) private platformId: any,
  ) { super(); }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const width = this.elementRef.nativeElement.offsetWidth;
      this.placeholderFontClass = setPlaceHolderAttributes(width);
    } else {
      this.placeholderFontClass = 'hide-placeholder-text';
    }
    super.ngOnInit();
  }

  getPage(page: number): Observable<RemoteData<PaginatedList<Item>>> {
    return this.relationshipService.getRelatedItemsByLabel(
      this.parentItem,
      this.relationType,
      Object.assign(this.options, {
        elementsPerPage: this.incrementBy,
        currentPage: page,
        fetchThumbnail: this.fetchThumbnail,
      }),
    );
  }
}
