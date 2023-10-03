import { Component } from '@angular/core';
import { LoginPageComponent as BaseComponent } from '../../../../app/login-page/login-page.component';

/**
 * This component represents the login page
 */
@Component({
  selector: 'ds-login-page',
  styleUrls: ['../../../../app/login-page/login-page.component.scss'],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent extends BaseComponent {}
