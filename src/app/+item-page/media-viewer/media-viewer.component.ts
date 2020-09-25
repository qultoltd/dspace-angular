import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BitstreamFormatDataService } from 'src/app/core/data/bitstream-format-data.service';
import { BitstreamFormat } from 'src/app/core/shared/bitstream-format.model';
import { Bitstream } from 'src/app/core/shared/bitstream.model';
import { getFirstSucceededRemoteDataPayload } from 'src/app/core/shared/operators';

@Component({
  selector: "ds-media-viewer",
  templateUrl: "./media-viewer.component.html",
  styleUrls: ["./media-viewer.component.scss"],
})
export class MediaViewerComponent implements OnInit {
  @Input() bitstreams: Bitstream[];

  playlist$: BehaviorSubject<any>;

  showFlag: boolean = false;
  currentIndex: number = 0;

  constructor(
    protected bitstreamFormatDataService: BitstreamFormatDataService
  ) {}

  showLightbox(index) {
    this.currentIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = 0;
  }

  ngOnInit() {
    this.playlist$ = new BehaviorSubject([]);
    for (const bitstream of this.bitstreams) {
      this.bitstreamFormatDataService
        .findByBitstream(bitstream)
        .pipe(getFirstSucceededRemoteDataPayload())
        .subscribe((format: BitstreamFormat) => {
          const current: Array<any> = this.playlist$.getValue();
          if (format.mimetype.includes("image")) {
            this.playlist$.next([
              ...current,
              { image: bitstream._links.content.href },
            ]);
          } else {
            this.playlist$.next([
              ...current,
              { video: bitstream._links.content.href },
            ]);
          }
        });
    }
  }
}
