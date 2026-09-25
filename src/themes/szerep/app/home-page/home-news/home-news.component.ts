import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';


/**
 * SZEREP home-news — replaces the DS10 metadata-driven news section with a static
 * branded welcome banner (own HTML + SCSS) using the `qulto.home.welcome.*` i18n
 * keys, which szerep overrides with SZE-specific text.
 */
@Component({
  selector: 'ds-themed-home-news',
  styleUrls: ['./home-news.component.scss'],
  // styleUrls: ['../../../../../app/home-page/home-news/home-news.component.scss'],
  templateUrl: './home-news.component.html',
  // templateUrl: '../../../../../app/home-page/home-news/home-news.component.html',
  imports: [
    TranslateModule,
  ],
})
export class HomeNewsComponent extends BaseComponent {}

