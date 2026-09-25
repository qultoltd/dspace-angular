import {
  ChangeDetectionStrategy,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import {
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';

import { DSONameService } from '../../../../../../../../app/core/breadcrumbs/dso-name.service';
import { mockItemWithMetadataFieldsAndValue } from '../../../../../../../../app/item-page/simple/field-components/specific-field/item-page-field.component.spec';
import { TranslateLoaderMock } from '../../../../../../../../app/shared/testing/translate-loader.mock';
import { ItemPageTitleFieldComponent } from './item-page-title-field.component';

let comp: ItemPageTitleFieldComponent;
let fixture: ComponentFixture<ItemPageTitleFieldComponent>;

const mockField = 'dc.title';
const mockValue = 'test value';

describe('ItemPageTitleFieldComponent', () => {
  let dsoNameServiceMock: jasmine.SpyObj<DSONameService>;

  beforeEach(waitForAsync(() => {
    dsoNameServiceMock = jasmine.createSpyObj('DSONameService', {
      getName: mockValue,
      getNameLanguage: 'en',
    });

    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateLoaderMock,
          },
        }),
        ItemPageTitleFieldComponent,
      ],
      providers: [
        { provide: DSONameService, useValue: dsoNameServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).overrideComponent(ItemPageTitleFieldComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    }).compileComponents();
  }));

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(ItemPageTitleFieldComponent);
    comp = fixture.componentInstance;
    comp.item = mockItemWithMetadataFieldsAndValue([mockField], mockValue);
    fixture.detectChanges();
  }));

  it('should populate nameMetadata from DSONameService on init', () => {
    expect(comp.nameMetadata.value).toBe(mockValue);
    expect(comp.nameMetadata.language).toBe('en');
  });

  it('should call getName and getNameLanguage with the item', () => {
    expect(dsoNameServiceMock.getName).toHaveBeenCalledWith(comp.item);
    expect(dsoNameServiceMock.getNameLanguage).toHaveBeenCalledWith(comp.item);
  });
});
