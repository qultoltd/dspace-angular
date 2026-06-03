/* eslint-disable dspace-angular-ts/themed-component-usages */
import { AdminSidebarComponent } from './app/admin/admin-sidebar/admin-sidebar.component';
import { HeaderComponent } from './app/header/header.component';
import { HomeNewsComponent } from './app/home-page/home-news/home-news.component';
import { NavbarComponent } from './app/navbar/navbar.component';
import { LangSwitchComponent } from './app/shared/lang-switch/lang-switch.component';

// NOTE: footer + header-nav-wrapper overrides were removed — they are inherited
// from qulto (footer logo asset is identical; only stale markup differed).
export const COMPONENTS = [
  AdminSidebarComponent,
  HomeNewsComponent,
  HeaderComponent,
  NavbarComponent,
  LangSwitchComponent,
];
