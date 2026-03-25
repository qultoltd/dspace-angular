import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Context } from 'src/app/core/shared/context.model';
import { MetadataRepresentationType } from 'src/app/core/shared/metadata-representation/metadata-representation.model';
import {
  getMetadataRepresentationComponent as defaultGet,
  METADATA_REPRESENTATION_COMPONENT_FACTORY,
} from 'src/app/shared/metadata-representation/metadata-representation.decorator';

import { RootModule } from '../../app/root.module';
// Your themed components
import { PersonComponent } from './app/entity-groups/research-entities/item-pages/person/person.component';
import { GenericItemMetadataListElementComponent } from './app/entity-groups/research-entities/metadata-representations/generic-item/generic-item-metadata-list-element.component';
import { FooterComponent } from './app/footer/footer.component';
import { HeaderComponent } from './app/header/header.component';
import { HeaderNavbarWrapperComponent } from './app/header-nav-wrapper/header-navbar-wrapper.component';
import { HomeNewsComponent } from './app/home-page/home-news/home-news.component';
import { ElteRelatedItemsComponent } from './app/item-page/simple/elte-related-items/elte-related-items.component';
import { MetadataValuesComponent } from './app/item-page/simple/field-components/specific-field/metadata-values/metadata-values.component';
import { CourseInstanceComponent } from './app/item-page/simple/item-types/course-instance/course-instance.component';
import { LearningObjectComponent } from './app/item-page/simple/item-types/learning-object/learning-object.component';
import { PublicationComponent } from './app/item-page/simple/item-types/publication/publication.component';
import { SimpleItemComponent } from './app/item-page/simple/item-types/simple-item/simple-item.component';
import { NavbarComponent } from './app/navbar/navbar.component';
import { LangSwitchComponent } from './app/shared/lang-switch/lang-switch.component';
import { CommunityListElementComponent } from './app/shared/object-list/community-list-element/community-list-element.component';

const THEME = 'elte';

function themedGet(
  entityType: string,
  mdType: MetadataRepresentationType,
  context: Context,
  theme: string,
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
    CourseInstanceComponent,
    SimpleItemComponent,
    GenericItemMetadataListElementComponent,
    HeaderComponent,
    HeaderNavbarWrapperComponent,
    NavbarComponent,
    HomeNewsComponent,
    CommunityListElementComponent,
    FooterComponent,
    LangSwitchComponent,
    PersonComponent,
    MetadataValuesComponent,
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
