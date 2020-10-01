import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaViewerVideoComponent } from './media-viewer-video.component';

describe('MediaViewerVideoComponent', () => {
  let component: MediaViewerVideoComponent;
  let fixture: ComponentFixture<MediaViewerVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaViewerVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaViewerVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
