import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components/component.module';

import {
  APIService,
  NetworkService,
  MessageService,
  WooService,
  SharedDataService
} from 'src/app/utilities/services';

@NgModule({
  exports: [CommonModule, ComponentsModule],
  entryComponents: [],
  providers: [APIService, NetworkService, MessageService, WooService, SharedDataService],
})
export class UtilitiesModule {}
