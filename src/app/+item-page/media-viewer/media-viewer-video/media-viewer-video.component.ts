import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "ds-media-viewer-video",
  templateUrl: "./media-viewer-video.component.html",
  styleUrls: ["./media-viewer-video.component.scss"],
})
export class MediaViewerVideoComponent implements OnInit {
  @Input() medias: any[];

  isCollapsed: boolean;
  currentIndex = 0;

  replacements = {
    video: "./assets/images/replacement_video.svg",
    audio: "./assets/images/replacement_audio.svg",
    document: "./assets/images/replacement_document.svg",
  };

  replacementThumbnail: string;
  constructor() {}

  ngOnInit() {
    this.isCollapsed = false;
    console.log("media", this.medias);
  }

  selectedMedia(index: number) {
    console.log(index);
    this.currentIndex = index;
  }
  nextMedia() {
    this.currentIndex++;
  }
  prevMedia() {
    this.currentIndex--;
  }
}
