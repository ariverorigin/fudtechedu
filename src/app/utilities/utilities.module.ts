import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components/component.module';
import { MomentModule } from 'ngx-moment';

import {
  APIService,
  NetworkService,
  MessageService,
  WooService,
  SharedDataService,
  StorageService,
  NativePluginService,
  FileService,
} from 'src/app/utilities/services';

@NgModule({
  exports: [CommonModule, ComponentsModule, MomentModule],
  providers: [
    APIService,
    NetworkService,
    MessageService,
    WooService,
    StorageService,
    NativePluginService,
    FileService,
  ],
})
export class UtilitiesModule {}
