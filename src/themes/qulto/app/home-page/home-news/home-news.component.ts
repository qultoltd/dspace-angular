import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { RootDataService } from '../../../../../app/core/data/root-data.service';
import { LocaleService } from '../../../../../app/core/locale/locale.service';
import { getFirstSucceededRemoteDataPayload } from '../../../../../app/core/shared/operators';
import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';

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

/**
 * Component to render the news section on the home page
 */
export class HomeNewsComponent extends BaseComponent {

  public dspaceName: string;

  constructor(
    protected rootService: RootDataService,
    protected route: ActivatedRoute,
    locale: LocaleService,
  ) {
    super(route, locale);
    this.setGenerator();
  }

  protected setGenerator(): void {
    this.rootService.findRoot().pipe(getFirstSucceededRemoteDataPayload()).subscribe((root) => {
      //console.log("rootService", root);
      this.dspaceName = root.dspaceName;
    });
  }
}
