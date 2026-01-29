import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { RootModule } from '../../app/root.module';
import { PersonComponent } from './app/entity-groups/research-entities/item-pages/person/person.component';
import { AdminSidebarComponent } from './app/admin/admin-sidebar/admin-sidebar.component';
import { HomePageComponent } from './app/home-page/home-page.component';
import { FullItemPageComponent } from './app/item-page/full/full-item-page.component';
import { ElteRelatedItemsComponent } from './app/item-page/simple/elte-related-items/elte-related-items.component';
import { ThemedItemPageTitleFieldComponent } from './app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { MetadataValuesComponent } from './app/item-page/simple/field-components/specific-field/metadata-values/metadata-values.component';
import { GenericItemPageFieldComponent } from './app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { LearningObjectComponent } from './app/item-page/simple/item-types/learning-object/learning-object.component';
import { PublicationComponent } from './app/item-page/simple/item-types/publication/publication.component';
import { SimpleItemComponent } from './app/item-page/simple/item-types/simple-item/simple-item.component';
import { LoginPageComponent } from './app/login-page/login-page.component';
import { AuthNavMenuComponent } from './app/shared/auth-nav-menu/auth-nav-menu.component';
import { ObjectListComponent } from './app/shared/object-list/object-list.component';

const DECLARATIONS = [
  HomePageComponent,
  LoginPageComponent,
  AdminSidebarComponent,
  ObjectListComponent,
  AuthNavMenuComponent,
  FullItemPageComponent,
  PublicationComponent,
  PersonComponent,
];

@NgModule({
  imports: [
    RootModule,
    CommonModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    ScrollToModule,
    StoreModule,
    StoreRouterConnectingModule,
    TranslateModule,
    FormsModule,
    NgxGalleryModule,
    PublicationComponent,
    ElteRelatedItemsComponent,
    LearningObjectComponent,
    SimpleItemComponent,
    ThemedItemPageTitleFieldComponent,
    GenericItemPageFieldComponent,
    MetadataValuesComponent,
    ...DECLARATIONS,
  ],
})

/**
   * This module serves as an index for all the components in this theme.
   * It should import all other modules, so the compiler knows where to find any components referenced
   * from a component in this theme
   * It is purposefully not exported, it should never be imported anywhere else, its only purpose is
   * to give lazily loaded components a context in which they can be compiled successfully
   */
class LazyThemeModule {
}
