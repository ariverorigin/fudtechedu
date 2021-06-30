import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import { UtilitiesModule } from 'src/app/utilities/utilities.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UtilitiesModule,
    DetailsPageRoutingModule,
  ],
  declarations: [DetailsPage],
})
export class DetailsPageModule {}
