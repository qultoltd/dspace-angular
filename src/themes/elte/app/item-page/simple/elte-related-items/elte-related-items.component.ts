import {
  AsyncPipe,
  isPlatformBrowser,
  NgClass,
  NgFor,
  NgIf,
} from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { FindListOptions } from 'src/app/core/data/find-list-options.model';
import { PaginatedList } from 'src/app/core/data/paginated-list.model';
import { RelationshipDataService } from 'src/app/core/data/relationship-data.service';
import { RemoteData } from 'src/app/core/data/remote-data';
import { Item } from 'src/app/core/shared/item.model';
import { ViewMode } from 'src/app/core/shared/view-mode.model';
import { AbstractIncrementalListComponent } from 'src/app/item-page/simple/abstract-incremental-list/abstract-incremental-list.component';
import { ThemedLoadingComponent } from 'src/app/shared/loading/themed-loading.component';
import { MetadataFieldWrapperComponent } from 'src/app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { ListableObjectComponentLoaderComponent } from 'src/app/shared/object-collection/shared/listable-object/listable-object-component-loader.component';
import { setPlaceHolderAttributes } from 'src/app/shared/utils/object-list-utils';
import { VarDirective } from 'src/app/shared/utils/var.directive';

import {
  APP_CONFIG,
  AppConfig,
} from '../../../../../../config/app-config.interface';

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
