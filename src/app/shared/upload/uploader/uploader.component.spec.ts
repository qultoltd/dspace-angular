import { HttpXsrfTokenExtractor } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import {
  ComponentFixture,
  inject,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from '@dspace/core/auth/auth.service';
import { CookieService } from '@dspace/core/cookies/cookie.service';
import { DragService } from '@dspace/core/drag.service';
import { AuthServiceStub } from '@dspace/core/testing/auth-service.stub';
import { CookieServiceMock } from '@dspace/core/testing/cookie.service.mock';
import { HttpXsrfTokenExtractorMock } from '@dspace/core/testing/http-xsrf-token-extractor.mock';
import { createTestComponent } from '@dspace/core/testing/utils.test';
import { TranslateModule } from '@ngx-translate/core';
import {
  FileItem,
  FileUploadModule,
} from 'ng2-file-upload';

import { LiveRegionService } from '../../live-region/live-region.service';
import { getLiveRegionServiceStub } from '../../live-region/live-region.service.stub';
import { UploaderComponent } from './uploader.component';
import { UploaderOptions } from './uploader-options.model';

describe('UploaderComponent', () => {

  let testComp: TestComponent;
  let testFixture: ComponentFixture<TestComponent>;
  let html;

  // waitForAsync beforeEach
  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [
        FileUploadModule,
        TranslateModule.forRoot(),
        UploaderComponent,
        TestComponent,
      ],
      providers: [
        ChangeDetectorRef,
        UploaderComponent,
        DragService,
        { provide: HttpXsrfTokenExtractor, useValue: new HttpXsrfTokenExtractorMock('mock-token') },
        { provide: AuthService, useValue: new AuthServiceStub() },
        { provide: CookieService, useValue: new CookieServiceMock() },
        { provide: LiveRegionService, useValue: getLiveRegionServiceStub() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

  }));

  // synchronous beforeEach
  beforeEach(() => {
    html = `
      <ds-uploader [onBeforeUpload]="onBeforeUpload"
                   [uploadFilesOptions]="uploadFilesOptions"
                   (onCompleteItem)="onCompleteItem($event)"></ds-uploader>`;

    testFixture = createTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;
    testComp = testFixture.componentInstance;
  });

  it('should create Uploader Component', inject([UploaderComponent], (app: UploaderComponent) => {

    expect(app).toBeDefined();
  }));

  describe('when an item is about to be uploaded', () => {

    let uploaderComponent: UploaderComponent;
    let authService: AuthService;

    beforeEach(() => {
      uploaderComponent = testFixture.debugElement.query(By.directive(UploaderComponent)).componentInstance;
      authService = TestBed.inject(AuthService);
    });

    it('should send the current auth token rather than the one captured when the uploader was built', () => {
      uploaderComponent.uploader.authToken = 'Bearer stale-token';
      spyOn(authService, 'buildAuthHeader').and.returnValue('Bearer fresh-token');

      uploaderComponent.uploader.onBeforeUploadItem({ url: 'http://test' } as unknown as FileItem);

      expect(uploaderComponent.uploader.authToken).toBe('Bearer fresh-token');
    });

    it('should keep the previous auth token when no header is available', () => {
      uploaderComponent.uploader.authToken = 'Bearer previous-token';
      spyOn(authService, 'buildAuthHeader').and.returnValue('');

      uploaderComponent.uploader.onBeforeUploadItem({ url: 'http://test' } as unknown as FileItem);

      expect(uploaderComponent.uploader.authToken).toBe('Bearer previous-token');
    });

  });

});

// declare a test component
@Component({
  selector: 'ds-test-cmp',
  template: `<ds-uploader></ds-uploader>`,
  imports: [
    FileUploadModule,
    UploaderComponent,
  ],
})
class TestComponent {
  public uploadFilesOptions: UploaderOptions = Object.assign(new UploaderOptions(), {
    url: 'http://test',
    authToken: null,
    disableMultipart: false,
    itemAlias: null,
  });

  /* eslint-disable no-empty,@typescript-eslint/no-empty-function */
  public onBeforeUpload = () => {
  };

  onCompleteItem(event) {
  }

  /* eslint-enable no-empty, @typescript-eslint/no-empty-function */
}
