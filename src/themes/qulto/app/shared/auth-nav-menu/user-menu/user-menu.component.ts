import { Component } from '@angular/core';
import { UserMenuComponent as BaseComponent } from 'src/app/shared/auth-nav-menu/user-menu/user-menu.component';


@Component({
  selector: 'ds-user-menu',
  templateUrl: './user-menu.component.html',
  // templateUrl: '../../../../../app/shared/auth-nav-menu/user-menu/user-menu.component.html',
  // styleUrls: ['auth-nav-menu.component.scss'],
  styleUrls: ['../../../../../../app/shared/auth-nav-menu/user-menu/user-menu.component.scss'],
})
export class UserMenuComponent extends BaseComponent {
}