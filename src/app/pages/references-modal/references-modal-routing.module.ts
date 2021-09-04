import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferencesModalPage } from './references-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ReferencesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferencesModalPageRoutingModule {}
