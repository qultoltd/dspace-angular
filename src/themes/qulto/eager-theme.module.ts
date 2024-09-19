import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeNewsComponent } from './app/home-page/home-news/home-news.component';
import { ThemedHeaderComponent } from './app/header/header.component';
import { HeaderNavbarWrapperComponent } from './app/header-nav-wrapper/header-navbar-wrapper.component';
import { RootModule } from '../../app/root.module';
import { FooterComponent } from './app/footer/footer.component';
import { AuthNavMenuComponent } from './app/shared/auth-nav-menu/auth-nav-menu.component';
import { UserMenuComponent } from './app/shared/auth-nav-menu/user-menu/user-menu.component';
import { LoginPageComponent } from './app/login-page/login-page.component';
import { ThemedAdminSidebarComponent } from './app/admin/admin-sidebar/admin-sidebar.component';
import { ThemedNavbarComponent } from './app/navbar/navbar.component';
import { RootComponent } from './app/root/root.component';

/**
 * Add components that use a custom decorator to ENTRY_COMPONENTS as well as DECLARATIONS.
 * This will ensure that decorator gets picked up when the app loads
 */
const ENTRY_COMPONENTS = [];

const DECLARATIONS = [
  ...ENTRY_COMPONENTS,
  HomeNewsComponent,
  ThemedHeaderComponent,
  HeaderNavbarWrapperComponent,
  FooterComponent,
  AuthNavMenuComponent,
  UserMenuComponent,
  LoginPageComponent,
  ThemedAdminSidebarComponent,
  ThemedNavbarComponent,
  RootComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RootModule,
    ...DECLARATIONS,
  ],
  providers: [...ENTRY_COMPONENTS.map((component) => ({ provide: component }))],
})
/**
 * This module is included in the main bundle that gets downloaded at first page load. So it should
 * contain only the themed components that have to be available immediately for the first page load,
 * and the minimal set of imports required to make them work. Anything you can cut from it will make
 * the initial page load faster, but may cause the page to flicker as components that were already
 * rendered server side need to be lazy-loaded again client side
 *
 * Themed EntryComponents should also be added here
 */
export class EagerThemeModule {}
