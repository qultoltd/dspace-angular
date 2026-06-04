import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { BtnDisabledDirective } from 'src/app/shared/btn-disabled.directive';
import { GoogleRecaptchaComponent } from 'src/app/shared/google-recaptcha/google-recaptcha.component';

import { RegisterEmailFormComponent as BaseComponent } from '../../../../app/register-email-form/register-email-form.component';

@Component({
  selector: 'ds-themed-register-email-form',
  templateUrl: './register-email-form.component.html',
  // templateUrl: '../../../../app/register-email-form/register-email-form.component.html',
  imports: [
    AlertComponent,
    AsyncPipe,
    BtnDisabledDirective,
    FormsModule,
    GoogleRecaptchaComponent,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class RegisterEmailFormComponent extends BaseComponent {
}
