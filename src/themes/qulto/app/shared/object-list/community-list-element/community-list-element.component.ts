import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DSONameService } from 'src/app/core/breadcrumbs/dso-name.service';
import { ThemedLoadingComponent } from 'src/app/shared/loading/themed-loading.component';
import { SafeUrlPipe } from 'src/app/shared/utils/safe-url-pipe';
import { VarDirective } from 'src/app/shared/utils/var.directive';

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
  imports: [ CommonModule, RouterLink, HttpClientModule, ThemedLoadingComponent, SafeUrlPipe, VarDirective],
})
/**
 * Component representing a list element for a community
 */
@listableObjectComponent(Community, ViewMode.ListElement)
export class CommunityListElementComponent extends BaseComponent {

  src$ = new BehaviorSubject<string>(undefined);
  isLoading$ = new BehaviorSubject(true);
  layout = environment.homePage.topLevelCommunityList.layout;
  description: string;

  constructor(private http: HttpClient, dsoNameService: DSONameService) {
    super(dsoNameService)
  }

  ngOnChanges(): void {
    this.description = this.object.metadata?.["dc.description.abstract"]?.[0]?.value;
    this.getLogoUrl().then(logoUrl => {
      if (logoUrl) {
        this.src$.next(logoUrl);
      } else{
        this.src$.next("/assets/qulto/images/default.svg");
      }
    });
  }

  async getLogoUrl(): Promise<string | undefined> {
    try {
      const response = await firstValueFrom(this.http.get<any>(this.object._links.logo.href));
      return response?._links.content.href;
    } catch (error) {
      return undefined;
    }
  }

  /**
   * Stop the loading animation once the thumbnail is successfully loaded
   */
  successHandler() {
    console.log("success")
    this.isLoading$.next(false);
  }
}
