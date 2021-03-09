import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of as observableOf } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DsoPageEditButtonComponent } from '../dso-page/dso-page-edit-button/dso-page-edit-button.component';
import { AuthService } from '../../core/auth/auth.service';
import { DSpaceObject } from '../../core/shared/dspace-object.model';
import { Item } from '../../core/shared/item.model';

describe('DsoPageEditButtonComponent', () => {
  let component: DsoPageEditButtonComponent;
  let fixture: ComponentFixture<DsoPageEditButtonComponent>;

  let authService: AuthService;
  let dso: DSpaceObject;

  beforeEach(waitForAsync(() => {
    dso = Object.assign(new Item(), {
      id: 'test-item',
      _links: {
        self: { href: 'test-item-selflink' }
      }
    });
    authService = jasmine.createSpyObj('authorizationService', {
      isAuthenticated: observableOf(true)
    });
    TestBed.configureTestingModule({
      declarations: [DsoPageEditButtonComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule.withRoutes([]), NgbModule],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsoPageEditButtonComponent);
    component = fixture.componentInstance;
    component.dso = dso;
    component.pageRoutePrefix = 'test';
    fixture.detectChanges();
  });

  describe('when the user is authorized', () => {
    beforeEach(() => {
      (authService.isAuthenticated as jasmine.Spy).and.returnValue(observableOf(true));
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should render a link', () => {
      const link = fixture.debugElement.query(By.css('a'));
      expect(link).not.toBeNull();
    });
  });

  describe('when the user is not authorized', () => {
    beforeEach(() => {
      (authService.isAuthenticated as jasmine.Spy).and.returnValue(observableOf(false));
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should not render a link', () => {
      const link = fixture.debugElement.query(By.css('a'));
      expect(link).toBeNull();
    });
  });
});
