import { Component } from '@angular/core';
import { UserMenuComponent as BaseComponent } from 'src/app/shared/auth-nav-menu/user-menu/user-menu.component';
import {
    AsyncPipe,
    NgClass,
    NgIf,
  } from '@angular/common';
  import {
    RouterLink,
    RouterLinkActive,
  } from '@angular/router';
  import { TranslateModule } from '@ngx-translate/core';
  import { ThemedLoadingComponent } from 'src/app/shared/loading/themed-loading.component';
  import { LogOutComponent } from 'src/app/shared/log-out/log-out.component';
  

@Component({
  selector: 'ds-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: [
    '../../../../../../app/shared/auth-nav-menu/user-menu/user-menu.component.scss',
  ],
  standalone: true,
  imports: [NgIf, ThemedLoadingComponent, RouterLinkActive, NgClass, RouterLink, LogOutComponent, AsyncPipe, TranslateModule],

})
export class UserMenuComponent extends BaseComponent {}