import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReferencesPageRoutingModule } from './references-routing.module';

import { ReferencesPage } from './references.page';
import { UtilitiesModule } from 'src/app/utilities/utilities.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReferencesPageRoutingModule,
    UtilitiesModule,
  ],
  declarations: [ReferencesPage],
})
export class ReferencesPageModule {}
