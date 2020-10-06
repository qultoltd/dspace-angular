import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject, forkJoin, of } from "rxjs";
import { BitstreamFormatDataService } from "src/app/core/data/bitstream-format-data.service";
import { BitstreamFormat } from "src/app/core/shared/bitstream-format.model";
import { Bitstream } from "src/app/core/shared/bitstream.model";
import {
  getFirstSucceededRemoteDataPayload,
  getFirstSucceededRemoteDataWithNotEmptyPayload,
} from "src/app/core/shared/operators";
import { DSONameService } from "src/app/core/breadcrumbs/dso-name.service";
import { Item } from "src/app/core/shared/item.model";
import { BitstreamDataService } from "src/app/core/data/bitstream-data.service";
import { PaginatedList } from "src/app/core/data/paginated-list";
import { hasNoValue, hasValue } from "src/app/shared/empty.util";
import { catchError, filter, map, takeWhile } from "rxjs/operators";
import { RemoteData } from "src/app/core/data/remote-data";

@Component({
  selector: "ds-media-viewer",
  templateUrl: "./media-viewer.component.html",
  styleUrls: ["./media-viewer.component.scss"],
})
export class MediaViewerComponent implements OnInit {
  @Input() item: Item;

  mediaList$: BehaviorSubject<any[]>;

  pageSize = 5;

  constructor(
    protected bitstreamDataService: BitstreamDataService,
    protected bitstreamFormatDataService: BitstreamFormatDataService,
    protected nameService: DSONameService
  ) {}

  ngOnInit(): void {
    this.mediaList$ = new BehaviorSubject([]);

    this.loadRemoteData("ORIGINAL")
      .subscribe((bitstreamsRD) => {
        this.loadRemoteData("THUMBNAIL").subscribe((thumbnailsRD) => {
          for (
            let index = 0;
            index < bitstreamsRD.payload.page.length;
            index++
          ) {
            this.bitstreamFormatDataService
              .findByBitstream(bitstreamsRD.payload.page[index])
              .pipe(getFirstSucceededRemoteDataPayload())
              .subscribe((format) => {
                const current = this.mediaList$.getValue();
                this.mediaList$.next([
                  ...current,
                  {
                    bitstream: bitstreamsRD.payload.page[index],
                    format: format.mimetype.split("/")[0],
                    thumbnail:
                      thumbnailsRD.payload &&
                      thumbnailsRD.payload.page[index]
                        ? thumbnailsRD.payload.page[index]._links.content.href
                        : null,
                  },
                ]);
              });
          }
        });
      });
  }

  loadRemoteData(bundleName: string) {
    return this.bitstreamDataService
      .findAllByItemAndBundleName(this.item, bundleName, {
        currentPage: 1,
        elementsPerPage: this.pageSize,
      })
      .pipe(
        filter((bitstreamsRD: RemoteData<PaginatedList<Bitstream>>) =>
          hasValue(bitstreamsRD)
        ),
        takeWhile(
          (bitstreamsRD_1: RemoteData<PaginatedList<Bitstream>>) =>
            hasNoValue(bitstreamsRD_1.payload) &&
            hasNoValue(bitstreamsRD_1.error),
          true
        )
      );
  }
}
