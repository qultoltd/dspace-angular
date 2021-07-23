import { Component, OnInit } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { DSpaceObjectType } from '../../../core/shared/dspace-object-type.model';
import { RemoteData } from '../../../core/data/remote-data';
import { DSpaceObject } from '../../../core/shared/dspace-object.model';
import { PaginatedList } from '../../../core/data/paginated-list.model';
import { Item } from '../../../core/shared/item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../../../shared/notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import {
  getFirstSucceededRemoteData,
  getFirstCompletedRemoteData
} from '../../../core/shared/operators';
import { ItemDataService } from '../../../core/data/item-data.service';
import { Observable, of as observableOf } from 'rxjs';
import { Collection } from '../../../core/shared/collection.model';
import { PaginationComponentOptions } from '../../../shared/pagination/pagination-component-options.model';
import { SearchService } from '../../../core/shared/search/search.service';
import { PaginatedSearchOptions } from '../../../shared/search/paginated-search-options.model';
import { SearchResult } from '../../../shared/search/search-result.model';
import { getItemPageRoute } from '../../item-page-routing-paths';

@Component({
  selector: 'ds-item-copy',
  templateUrl: './item-copy.component.html'
})
/**
 * Component that handles the moving of an item to a different collection
 */
export class ItemCopyComponent implements OnInit {
  /**
   * TODO: There is currently no backend support to change the owningCollection and inherit policies,
   * TODO: when this is added, the inherit policies option should be used.
   */

  selectorType = DSpaceObjectType.COLLECTION;

  itemRD$: Observable<RemoteData<Item>>;
  collectionSearchResults: Observable<any[]> = observableOf([]);
  selectedCollectionName: string;
  selectedCollection: Collection;
  canSubmit = false;

  item: Item;
  processing = false;

  pagination = new PaginationComponentOptions();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private notificationsService: NotificationsService,
              private itemDataService: ItemDataService,
              private searchService: SearchService,
              private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.itemRD$ = this.route.data.pipe(map((data) => data.dso), getFirstSucceededRemoteData()) as Observable<RemoteData<Item>>;
    this.itemRD$.subscribe((rd) => {
        this.item = rd.payload;
      }
    );
    this.pagination.pageSize = 5;
    this.loadSuggestions('');
  }

  /**
   * Find suggestions based on entered query
   * @param query - Search query
   */
  findSuggestions(query): void {
    this.loadSuggestions(query);
  }

  /**
   * Load all available collections to copy the item to.
   *  TODO: When the API support it, only fetch collections where user has ADD rights to.
   */
  loadSuggestions(query): void {
    this.collectionSearchResults = this.searchService.search(new PaginatedSearchOptions({
      pagination: this.pagination,
      dsoTypes: [DSpaceObjectType.COLLECTION],
      query: query
    })).pipe(
      first(),
      map((rd: RemoteData<PaginatedList<SearchResult<DSpaceObject>>>) => {
        return rd.payload.page.map((searchResult) => {
          return searchResult.indexableObject;
        });
      }) ,
    );

  }

  /**
   * Set the collection name and id based on the selected value
   * @param data - obtained from the ds-input-suggestions component
   */
  onClick(data: any): void {
    this.selectedCollection = data;
    this.selectedCollectionName = data.name;
    this.canSubmit = true;
  }

  /**
   * @returns {string} the current URL
   */
  getCurrentUrl() {
    return this.router.url;
  }

  /**
   * Copies the item to a new collection based on the selected collection
   */
  copyCollection() {
    this.processing = true;
    this.itemDataService.copyToCollection(this.item.id, this.selectedCollection).pipe(getFirstCompletedRemoteData()).subscribe(
      (response: RemoteData<Collection>) => {
        this.router.navigate([getItemPageRoute(this.item)]);
        console.log(response)
        if (response.hasSucceeded) {
          this.notificationsService.success(this.translateService.get('item.edit.copy.success'));
        } else {
          this.notificationsService.error(this.translateService.get('item.edit.copy.error'));
        }
        this.processing = false;
      }
    );
  }

  /**
   * Resets the can submit when the user changes the content of the input field
   * @param data
   */
  resetCollection(data: any) {
    this.canSubmit = false;
  }
}
