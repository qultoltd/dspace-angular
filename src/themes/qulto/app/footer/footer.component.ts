import { Component } from '@angular/core';
import { FooterComponent as BaseComponent } from '../../../../app/footer/footer.component';

@Component({
  selector: 'ds-footer',
  styleUrls: ['footer.component.scss'],
  templateUrl: 'footer.component.html',
  standalone: true
})
export class FooterComponent extends BaseComponent {
  currentYear: number = new Date().getFullYear();
}