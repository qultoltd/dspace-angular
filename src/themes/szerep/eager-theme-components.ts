/* eslint-disable dspace-angular-ts/themed-component-usages */
import { HeaderComponent } from './app/header/header.component';
import { HomeNewsComponent } from './app/home-page/home-news/home-news.component';

// Removed from here (now inherited from qulto via CSS variable overrides):
//   AdminSidebarComponent  → qulto's component + --ds-admin-sidebar-logo var
//   LangSwitchComponent    → qulto's component + --ds-lang-flag-* vars
// Auth-nav-menu and community-list-element were never registered here;
// they were resolved dynamically and now also fall back to qulto.
export const COMPONENTS = [
  HomeNewsComponent,
  HeaderComponent,
];
