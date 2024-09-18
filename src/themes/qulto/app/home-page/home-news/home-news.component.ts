import { Component } from '@angular/core';
import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ds-home-news',
  styleUrls: ['./home-news.component.scss'],
  templateUrl: './home-news.component.html',
  standalone: true,
  imports: [ TranslateModule ],

})

/**
 * Component to render the news section on the home page
 */
export class HomeNewsComponent extends BaseComponent {}