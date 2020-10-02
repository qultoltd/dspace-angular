import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaViewerImageComponent } from './media-viewer-image.component';

describe('MediaViewerImageComponent', () => {
  let component: MediaViewerImageComponent;
  let fixture: ComponentFixture<MediaViewerImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaViewerImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaViewerImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
