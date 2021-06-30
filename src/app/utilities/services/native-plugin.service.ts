import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';

import { Diagnostic } from '@ionic-native/diagnostic/ngx';

import {
  AppLauncher,
  AppLauncherOptions,
} from '@ionic-native/app-launcher/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { MessageService } from './message.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ErrorMessagesEnum } from '../enum';

declare var cordova: any;
@Injectable()
export class NativePluginService {
  constructor(
    private messageService: MessageService,
    private platform: Platform,
    private diagnostic: Diagnostic,
    private appLauncher: AppLauncher,
    private iab: InAppBrowser,
    private socialSharing: SocialSharing
  ) {}

  share(
    message?: string,
    subject?: string,
    file?: string | string[],
    url?: string
  ) {
    if (!this.platform.is('cordova')) {
      this.messageService.presentToast(ErrorMessagesEnum.RunOnDevice);
      return new Promise((reject) => reject(false));
    }
    return this.socialSharing.share(message, subject, file, url);
  }

  checkGalleryPermission(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.platform.is('ios')) {
        this.diagnostic.getCameraAuthorizationStatus().then((status) => {
          switch (status) {
            case this.diagnostic.permissionStatus.DENIED ||
              this.diagnostic.permissionStatus.DENIED_ALWAYS:
              resolve(false);
              break;
            case this.diagnostic.permissionStatus.GRANTED:
              resolve(true);
              break;
            default:
              this.diagnostic
                .requestCameraAuthorization()
                .then((authorisation) => {
                  resolve(
                    authorisation == this.diagnostic.permissionStatus.GRANTED
                  );
                });
              // resolve(false);
              break;
          }
        });
      } else if (this.platform.is('android')) {
        this.diagnostic
          .requestRuntimePermission(
            this.diagnostic.permission.WRITE_EXTERNAL_STORAGE
          )
          .then((status) => {
            switch (status) {
              case this.diagnostic.permissionStatus.DENIED ||
                this.diagnostic.permissionStatus.DENIED_ALWAYS:
                resolve(false);
                break;
              case this.diagnostic.permissionStatus.GRANTED:
                resolve(true);
                break;
              default:
                resolve(false);
                break;
            }
          });
      }
    });
  }

  openAppPlaystore(packageName: string) {
    this.launchExternalApp(
      '',
      'com.android.vending',
      'market://details?id=' + packageName,
      'https://play.google.com/store/apps/details?hl=en&id=' + packageName,
      packageName
    );
  }

  openAppAppStore(packageName: string) {
    // this.sharedDataService.presentToast("Not available");
    this.launchExternalApp(
      '',
      '',
      'itms-apps://itunes.apple.com/app/',
      'itms-apps://itunes.apple.com/app/' + packageName,
      packageName
    );
  }

  openInAppBrowser(url: string, target?: string) {
    if (this.platform.is('cordova')) {
      this.iab.create(url, target || '_system', 'zoom=no');
    } else {
      window.open(url);
    }
  }

  launchExternalApp(
    iosSchemaName: string,
    androidPackageName: string,
    appUrl: string,
    httpUrl: string,
    username: string
  ) {
    let options: AppLauncherOptions = { uri: '', packageName: '' };
    if (this.platform.is('ios') && this.platform.is('cordova')) {
      options.uri = iosSchemaName;
    } else if (this.platform.is('android') && this.platform.is('cordova')) {
      options.packageName = androidPackageName;
    } else {
      window.open(httpUrl + username, '_system', 'location=yes');
    }

    this.appLauncher.canLaunch(options).then(
      () => {
        // success callback
        let browser = this.iab.create(appUrl + username, '_system');
      },
      () => {
        // error callback
        let browser = this.iab.create(httpUrl + username, '_system');
      }
    );
  }
}
