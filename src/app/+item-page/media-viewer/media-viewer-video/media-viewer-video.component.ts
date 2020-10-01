import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "ds-media-viewer-video",
  templateUrl: "./media-viewer-video.component.html",
  styleUrls: ["./media-viewer-video.component.scss"],
})
export class MediaViewerVideoComponent implements OnInit {
  @Input() src: string;
  @Input() thumbnail: string;
  @Input() format: string;

  replacements = {
    video: "./assets/images/replacement_video.svg",
    audio: "./assets/images/replacements_audio.svg",
    document: "./assets/images/replacements_document.svg",
    image: "./assets/images/replacements_image.svg",
  };

  replacementThumbnail: string;
  constructor() {}

  ngOnInit() {
    this.replacementThumbnail = this.replacements[this.format];
    console.log(this.src, this.thumbnail, this.format);
  }
}
