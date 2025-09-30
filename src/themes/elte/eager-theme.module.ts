import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RootModule } from '../../app/root.module';

// Your themed components
import { FooterComponent } from './app/footer/footer.component';
import { HeaderComponent } from './app/header/header.component';
import { HeaderNavbarWrapperComponent } from './app/header-nav-wrapper/header-navbar-wrapper.component';
import { HomeNewsComponent } from './app/home-page/home-news/home-news.component';
import { NavbarComponent } from './app/navbar/navbar.component';
import { LangSwitchComponent } from './app/shared/lang-switch/lang-switch.component';
import { CommunityListElementComponent } from './app/shared/object-list/community-list-element/community-list-element.component';

import { PublicationComponent } from './app/item-page/simple/item-types/publication/publication.component';
import { ElteRelatedItemsComponent } from './app/item-page/simple/elte-related-items/elte-related-items.component';
import { LearningObjectComponent } from './app/item-page/simple/item-types/learning-object/learning-object.component';
import { SimpleItemComponent } from './app/item-page/simple/item-types/simple-item/simple-item.component';
import { GenericItemMetadataListElementComponent } from './app/entity-groups/research-entities/metadata-representations/generic-item/generic-item-metadata-list-element.component';

import { METADATA_REPRESENTATION_COMPONENT_FACTORY, getMetadataRepresentationComponent as defaultGet } from 'src/app/shared/metadata-representation/metadata-representation.decorator';

import { MetadataRepresentationType } from 'src/app/core/shared/metadata-representation/metadata-representation.model';
import { Context } from 'src/app/core/shared/context.model';

const THEME = 'elte';

function themedGet(
  entityType: string,
  mdType: MetadataRepresentationType,
  context: Context,
  theme: string
) {
  if (theme === THEME && mdType === MetadataRepresentationType.Item) {
    return GenericItemMetadataListElementComponent as any;
  }
  return defaultGet(entityType, mdType, context, theme);
}

const DECLARATIONS = [
];

@NgModule({
  imports: [
    CommonModule,
    RootModule,
    PublicationComponent,
    ElteRelatedItemsComponent,
    LearningObjectComponent,
    SimpleItemComponent,
    GenericItemMetadataListElementComponent,
    HeaderComponent,
    HeaderNavbarWrapperComponent,
    NavbarComponent,
    HomeNewsComponent,
    CommunityListElementComponent,
    FooterComponent,
    LangSwitchComponent,
  ],
  declarations: DECLARATIONS,
  providers: [
    {
      provide: METADATA_REPRESENTATION_COMPONENT_FACTORY,
      useFactory: () => themedGet,
    },
  ],
})
export class EagerThemeModule {}
