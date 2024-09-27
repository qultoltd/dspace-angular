import { NgIf, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DSONameService } from 'src/app/core/breadcrumbs/dso-name.service';

import { Community } from '../../../../../../app/core/shared/community.model';
import { Context } from '../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../app/core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { CommunityListElementComponent as BaseComponent } from '../../../../../../app/shared/object-list/community-list-element/community-list-element.component';

@listableObjectComponent(Community, ViewMode.ListElement, Context.Any, 'qulto')

@Component({
  selector: 'ds-community-list-element',
  styleUrls: ['./community-list-element.component.scss'],
  // styleUrls: ['../../../../../../app/shared/object-list/community-list-element/community-list-element.component.scss'],
  templateUrl: './community-list-element.component.html',
  // templateUrl: '../../../../../../app/shared/object-list/community-list-element/community-list-element.component.html',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink, HttpClientModule],
})
/**
 * Component representing a list element for a community
 */
@listableObjectComponent(Community, ViewMode.ListElement)
export class CommunityListElementComponent extends BaseComponent {

  logoUrl$ = new BehaviorSubject<string>('');
  description: string;
  layout = environment.homePage.topLevelCommunityList.layout;

  constructor(private http: HttpClient, dsoNameService: DSONameService) {super(dsoNameService)}

  ngOnInit(): void {
    this.getDataFromBackend()
    this.description = this.object.metadata?.["dc.description.abstract"]?.[0]?.value
  }

  getDataFromBackend(): void {
    this.http.get<any>(this.object._links.logo.href)
      .pipe(
        map(response => response?._links.content.href) 
      )
      .subscribe(
        {
          next: (logoUrl: string) => {
            this.logoUrl$.next(logoUrl);
          }
        }
      );
  }
}
