/* eslint-disable dspace-angular-ts/themed-component-usages */
import { AdminSidebarComponent } from './app/admin/admin-sidebar/admin-sidebar.component';
import { HeaderComponent } from './app/header/header.component';
import { HomeNewsComponent } from './app/home-page/home-news/home-news.component';
import { LangSwitchComponent } from './app/shared/lang-switch/lang-switch.component';

// NOTE: footer, header-nav-wrapper and navbar overrides were removed — they are
// inherited from qulto. The navbar's dark dropdown / navy mobile colours now come
// from CSS variables (see styles/_theme_css_variable_overrides.scss); the header
// override is kept (navy background + szerep logo).
export const COMPONENTS = [
  AdminSidebarComponent,
  HomeNewsComponent,
  HeaderComponent,
  LangSwitchComponent,
];
