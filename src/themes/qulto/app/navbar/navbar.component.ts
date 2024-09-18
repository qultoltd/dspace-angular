import { Component } from '@angular/core';
import { NavbarComponent as BaseComponent } from '../../../../app/navbar/navbar.component';

import {
    AsyncPipe,
    NgClass,
    NgComponentOutlet,
    NgFor,
    NgIf,
  } from '@angular/common';
  import { RouterLink } from '@angular/router';
  import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
  import { TranslateModule } from '@ngx-translate/core';
  import { ThemedSearchNavbarComponent } from 'src/app/search-navbar/themed-search-navbar.component';
  import { ThemedLangSwitchComponent } from 'src/app/shared/lang-switch/themed-lang-switch.component';

  import { slideMobileNav } from '../../../../app/shared/animations/slide';
  import { ContextHelpToggleComponent } from '../../../../app/header/context-help-toggle/context-help-toggle.component';
  import { ImpersonateNavbarComponent } from '../../../../app/shared/impersonate-navbar/impersonate-navbar.component';

  import { AuthNavMenuComponent } from '../shared/auth-nav-menu/auth-nav-menu.component';
  import { UserMenuComponent } from '../shared/auth-nav-menu/user-menu/user-menu.component';


/**
 * Component representing the public navbar
 */
@Component({
  selector: 'ds-themed-navbar',
  styleUrls: ['navbar.component.scss'],
  templateUrl: 'navbar.component.html',
  animations: [slideMobileNav],
  standalone: true,
  imports: [
    NgbDropdownModule, 
    ThemedLangSwitchComponent, 
    ThemedSearchNavbarComponent, 
    NgClass, 
    RouterLink, 
    NgIf, 
    NgFor, 
    NgComponentOutlet, 
    ContextHelpToggleComponent, 
    AuthNavMenuComponent, 
    ImpersonateNavbarComponent, 
    AsyncPipe, 
    TranslateModule, 
    UserMenuComponent
  ],

})
export class ThemedNavbarComponent extends BaseComponent {}