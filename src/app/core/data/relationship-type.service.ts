import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest as observableCombineLatest, Observable } from 'rxjs';
import { filter, find, map, mergeMap, switchMap } from 'rxjs/operators';
import { AppState } from '../../app.reducer';
import { isNotUndefined } from '../../shared/empty.util';
import { NotificationsService } from '../../shared/notifications/notifications.service';
import { followLink } from '../../shared/utils/follow-link-config.model';
import { dataService } from '../cache/builders/build-decorators';
import { RemoteDataBuildService } from '../cache/builders/remote-data-build.service';
import { ObjectCacheService } from '../cache/object-cache.service';
import { CoreState } from '../core.reducers';
import { HALEndpointService } from '../shared/hal-endpoint.service';
import { ItemType } from '../shared/item-relationships/item-type.model';
import { RelationshipType } from '../shared/item-relationships/relationship-type.model';
import { RELATIONSHIP_TYPE } from '../shared/item-relationships/relationship-type.resource-type';
import { getFirstSucceededRemoteData } from '../shared/operators';
import { DataService } from './data.service';
import { DefaultChangeAnalyzer } from './default-change-analyzer.service';
import { ItemDataService } from './item-data.service';
import { PaginatedList } from './paginated-list.model';
import { RemoteData } from './remote-data';
import { RequestService } from './request.service';

/**
 * The service handling all relationship type requests
 */
@Injectable()
@dataService(RELATIONSHIP_TYPE)
export class RelationshipTypeService extends DataService<RelationshipType> {
  protected linkPath = 'relationshiptypes';

  constructor(protected itemService: ItemDataService,
              protected requestService: RequestService,
              protected rdbService: RemoteDataBuildService,
              protected store: Store<CoreState>,
              protected halService: HALEndpointService,
              protected objectCache: ObjectCacheService,
              protected notificationsService: NotificationsService,
              protected http: HttpClient,
              protected comparator: DefaultChangeAnalyzer<RelationshipType>,
              protected appStore: Store<AppState>) {
    super();
  }

  /**
   * Get the RelationshipType for a relationship type by label
   * @param label
   */
  getRelationshipTypeByLabelAndTypes(label: string, firstType: string, secondType: string): Observable<RelationshipType> {
    return this.findAll({ currentPage: 1, elementsPerPage: 9999 }, true, true, followLink('leftType'), followLink('rightType'))
      .pipe(
        getFirstSucceededRemoteData(),
        /* Flatten the page so we can treat it like an observable */
        switchMap((typeListRD: RemoteData<PaginatedList<RelationshipType>>) => typeListRD.payload.page),
        mergeMap((type: RelationshipType) => {
          if (type.leftwardType === label) {
            return this.checkType(type, firstType, secondType);
          } else if (type.rightwardType === label) {
            return this.checkType(type, secondType, firstType);
          } else {
            return [];
          }
        }),
      );
  }

  // Check if relationship type matches the given types
  // returns a void observable if there's not match
  // returns an observable that emits the relationship type when there is a match
  private checkType(type: RelationshipType, firstType: string, secondType: string): Observable<RelationshipType> {
    const entityTypes = observableCombineLatest([type.leftType.pipe(getFirstSucceededRemoteData()), type.rightType.pipe(getFirstSucceededRemoteData())]);
    return entityTypes.pipe(
      find(([leftTypeRD, rightTypeRD]: [RemoteData<ItemType>, RemoteData<ItemType>]) => leftTypeRD.payload.label === firstType && rightTypeRD.payload.label === secondType),
      filter((types) => isNotUndefined(types)),
      map(() => type)
    );
  }
}
