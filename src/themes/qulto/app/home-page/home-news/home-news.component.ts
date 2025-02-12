import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';
import { RootDataService } from '../../../../../app/core/data/root-data.service';
import { getFirstSucceededRemoteDataPayload } from '../../../../../app/core/shared/operators';
import { Root } from 'src/app/core/data/root.model';
@Component({
  selector: 'ds-themed-home-news',
  styleUrls: ['./home-news.component.scss'],
  // styleUrls: ['../../../../../app/home-page/home-news/home-news.component.scss'],
  templateUrl: './home-news.component.html',
  // templateUrl: '../../../../../app/home-page/home-news/home-news.component.html',
  standalone: true,
  imports: [TranslateModule],
})

/**
 * Component to render the news section on the home page
 */
export class HomeNewsComponent extends BaseComponent {

  public dspaceName: String;

  constructor(
    protected rootService: RootDataService
  ) {
    super();
    this.setGenerator();
  }

  protected setGenerator(): void {
    this.rootService.findRoot().pipe(getFirstSucceededRemoteDataPayload()).subscribe((root) => {
      //console.log("rootService", root);
      this.dspaceName = root.dspaceName;
    });
  }
}
