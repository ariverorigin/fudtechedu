import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import {
  LessonItemComponent,
  ThumbnailComponent,
  NoItemComponent,
  NoItemImageComponent,
  NoItemListComponent,
  ImageCachingComponent,
} from '.';

const components = [
  LessonItemComponent,
  ThumbnailComponent,
  NoItemComponent,
  NoItemImageComponent,
  NoItemListComponent,
  ImageCachingComponent,
];

@NgModule({
  declarations: components,
  imports: [RouterModule, IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [...components],
})
export class ComponentsModule {}
