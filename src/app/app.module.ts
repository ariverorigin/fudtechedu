import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Network } from '@ionic-native/network/ngx';
import { UtilitiesModule } from './utilities/utilities.module';
import { Storage } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { SharedDataService } from './utilities/services';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { AppLauncher } from '@ionic-native/app-launcher/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { HTTP } from '@ionic-native/http/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    UtilitiesModule,
    HttpClientModule,
  ],
  providers: [
    Network,
    Storage,
    Diagnostic,
    AppLauncher,
    InAppBrowser,
    SocialSharing,
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SharedDataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
