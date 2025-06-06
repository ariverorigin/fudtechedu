import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import { UtilitiesModule } from 'src/app/utilities/utilities.module';
import { DynamicHooksModule, HookParserEntry } from 'ngx-dynamic-hooks';
import { ImageCachingComponent } from '../../components';
import { PipesModule } from 'src/app/utilities/pipes/pipes.module';

const componentParsers: Array<HookParserEntry> = [
  { component: ImageCachingComponent },
  // ...
];

@NgModule({
  imports: [
    DynamicHooksModule.forRoot({
      globalParsers: componentParsers,
    }),
    CommonModule,
    FormsModule,
    IonicModule,
    UtilitiesModule,
    DetailsPageRoutingModule,
    PipesModule,
  ],
  declarations: [DetailsPage],
})
export class DetailsPageModule {}
