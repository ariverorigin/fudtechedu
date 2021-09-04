import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReferencesModalPageRoutingModule } from './references-modal-routing.module';

import { ReferencesModalPage } from './references-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReferencesModalPageRoutingModule
  ],
  declarations: [ReferencesModalPage]
})
export class ReferencesModalPageModule {}
