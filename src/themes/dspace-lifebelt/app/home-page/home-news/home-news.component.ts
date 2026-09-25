import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { LocaleService } from '../../../../../app/core/locale/locale.service';
import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';

@Component({
  selector: 'ds-themed-home-news',
  styleUrls: ['./home-news.component.scss'],
  templateUrl: './home-news.component.html',
  imports: [
    TranslateModule,
  ],
})

/**
 * Webinar (dspace-lifebelt) variant of the home page banner.
 * Static event banner; inherits everything else from the qulto theme.
 */
export class HomeNewsComponent extends BaseComponent {

  constructor(
    route: ActivatedRoute,
    locale: LocaleService,
  ) {
    super(route, locale);
  }
}
