import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BitstreamFormatDataService } from "src/app/core/data/bitstream-format-data.service";
import { BitstreamFormat } from "src/app/core/shared/bitstream-format.model";
import { Bitstream } from "src/app/core/shared/bitstream.model";
import { getFirstSucceededRemoteDataPayload } from "src/app/core/shared/operators";
import { DSONameService } from "src/app/core/breadcrumbs/dso-name.service";
import { Item } from "src/app/core/shared/item.model";
import { BitstreamDataService } from "src/app/core/data/bitstream-data.service";
import { PaginatedList } from "src/app/core/data/paginated-list";
import { hasNoValue, hasValue } from "src/app/shared/empty.util";
import { filter, takeWhile } from "rxjs/operators";
import { RemoteData } from "src/app/core/data/remote-data";

@Component({
  selector: "ds-media-viewer",
  templateUrl: "./media-viewer.component.html",
  styleUrls: ["./media-viewer.component.scss"],
})
export class MediaViewerComponent implements OnInit {
  @Input() item: Item;

  bitstreams$: BehaviorSubject<Bitstream[]>;
  thumbnails$: BehaviorSubject<Bitstream[]>;

  medialist$: BehaviorSubject<Array<object>>;

  currentIndex = 0;

  pageSize = 5;

  isCollapsed: boolean;

  replacementThumbnail: string;

  replacements = {
    video: "./assets/images/replacement_video.svg",
    audio: "./assets/images/replacements_audio.svg",
    document: "./assets/images/replacements_document.svg",
    image: "./assets/images/replacements_image.svg",
  };

  constructor(
    protected bitstreamDataService: BitstreamDataService,
    protected bitstreamFormatDataService: BitstreamFormatDataService,
    protected nameService: DSONameService
  ) {}

  ngOnInit(): void {
    this.bitstreams$ = new BehaviorSubject([]);
    this.medialist$ = new BehaviorSubject([]);
    this.thumbnails$ = new BehaviorSubject([]);
    this.isCollapsed = false;

    this.bitstreamDataService
      .findAllByItemAndBundleName(this.item, "ORIGINAL", {
        currentPage: 1,
        elementsPerPage: this.pageSize,
      })
      .pipe(
        filter((bitstreamsRD: RemoteData<PaginatedList<Bitstream>>) =>
          hasValue(bitstreamsRD)
        ),
        takeWhile(
          (bitstreamsRD: RemoteData<PaginatedList<Bitstream>>) =>
            hasNoValue(bitstreamsRD.payload) && hasNoValue(bitstreamsRD.error),
          true
        )
      )
      .subscribe((bitstreamsRD: RemoteData<PaginatedList<Bitstream>>) => {
        const current: Bitstream[] = this.bitstreams$.getValue();
        this.bitstreams$.next([...current, ...bitstreamsRD.payload.page]);
        for (const bitstream of bitstreamsRD.payload.page) {
          this.bitstreamFormatDataService
            .findByBitstream(bitstream)
            .pipe(getFirstSucceededRemoteDataPayload())
            .subscribe((format: BitstreamFormat) => {
              const currentMedias: Array<object> = this.medialist$.getValue();
              this.medialist$.next([
                ...currentMedias,
                {
                  bitstream: bitstream,
                  format: format.mimetype.split("/")[0],
                },
              ]);
            });
        }
      });
    this.bitstreamDataService
      .findAllByItemAndBundleName(this.item, "THUMBNAIL", {
        currentPage: 1,
        elementsPerPage: this.pageSize,
      })
      .pipe(
        filter((bitstreamsRD: RemoteData<PaginatedList<Bitstream>>) =>
          hasValue(bitstreamsRD)
        ),
        takeWhile(
          (bitstreamsRD: RemoteData<PaginatedList<Bitstream>>) =>
            hasNoValue(bitstreamsRD.payload) && hasNoValue(bitstreamsRD.error),
          true
        )
      )
      .subscribe((thumbnail: RemoteData<PaginatedList<Bitstream>>) => {
        const currentThumbnails: Bitstream[] = this.thumbnails$.getValue();
        if (thumbnail.payload) {
          this.thumbnails$.next([
            ...currentThumbnails,
            ...thumbnail.payload.page,
          ]);
        }
      });
  }
  selectedMedia(index: number) {
    console.log(index);
    this.currentIndex = index;
  }
  nextMedia() {
    // this.currentIndex = this.currentIndex + 1;
    this.currentIndex++;
    console.log(this.currentIndex);
  }
  prevMedia() {
    this.currentIndex = this.currentIndex - 1;
  }
}
