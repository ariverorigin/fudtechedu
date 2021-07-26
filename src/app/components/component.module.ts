import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MomentModule } from 'ngx-moment';

import {
  LessonItemComponent,
  ThumbnailComponent,
  NoItemComponent,
  NoItemImageComponent,
  NoItemListComponent,
  ImageCachingComponent,
  BannerComponent,
  SkeletonBoxProductComponent,
  CategoriesComponent,
} from '.';

const components = [
  LessonItemComponent,
  ThumbnailComponent,
  NoItemComponent,
  NoItemImageComponent,
  NoItemListComponent,
  ImageCachingComponent,
  BannerComponent,
  SkeletonBoxProductComponent,
  CategoriesComponent,
];

@NgModule({
  declarations: components,
  imports: [RouterModule, IonicModule, CommonModule, FormsModule, MomentModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [...components],
})
export class ComponentsModule {}
