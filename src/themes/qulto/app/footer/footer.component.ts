import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent as BaseComponent } from '../../../../app/footer/footer.component';

/**
 * Qulto footer — entirely replaces the DSpace footer with Monguz/qulto branding
 * (company name, year, and the qulto logo). The base multi-column footer is not used.
 */
@Component({
  selector: 'ds-themed-footer',
  styleUrls: ['./footer.component.scss'],
  // styleUrls: ['../../../../app/footer/footer.component.scss'],
  templateUrl: './footer.component.html',
  // templateUrl: '../../../../app/footer/footer.component.html',
  imports: [
    TranslateModule,
  ],
})
export class FooterComponent extends BaseComponent {
  currentYear: number = new Date().getFullYear();
}
