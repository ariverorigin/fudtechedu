import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { MenuController, NavController, Platform } from '@ionic/angular';
import {
  FileService,
  MessageService,
  StorageService,
} from './utilities/services';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  backButtonSubscription: Subscription;
  counterExitApp: number = 0;

  constructor(
    private storageService: StorageService,
    private platform: Platform,
    private menuController: MenuController,
    private navController: NavController,
    private messageService: MessageService,
    private router: Router,
    private fileService: FileService
  ) {
    this.storageService.init();
    this.initializeApp();
  }

  ngOnInit() {}

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.initializedBackButtonAction();
        this.initializeImageCacheDirectory();
      }
    });
  }

  initializedBackButtonAction() {
    this.backButtonSubscription =
      this.platform.backButton.subscribeWithPriority(10, () => {
        this.menuController
          .isOpen()
          .then((res) => {
            if (res) {
              this.menuController.close();
            } else {
              this.backButtonEvents();
            }
          })
          .catch((e) => console.log('initializedBackButtonAction ERROR', e));
      });
  }

  async backButtonEvents() {
    const loadingActiveEl = document.querySelector('ion-loading'),
      alertActiveEl = document.querySelector('ion-alert'),
      modalActiveEl = document.querySelector('ion-modal:not(.location-modal)'),
      pickerActiveEl = document.querySelector('ion-picker'),
      actionSheetActiveEl = document.querySelector('ion-action-sheet'),
      popover = document.querySelector('ion-popover'),
      disableBackButtonContainer = document.querySelector(
        '.disable-back-button'
      ),
      url = this.router.url,
      fabEl: any = document.querySelector('ion-fab.tab-fab');

    if (disableBackButtonContainer) {
      return false;
    } else if (fabEl && fabEl.activated) {
      fabEl.click();
    } else if (loadingActiveEl) {
      this.messageService.dismisActiveControllers('loading');
      return false;
    } else if (alertActiveEl) {
      this.messageService.dismisActiveControllers('alert');
      return false;
    } else if (modalActiveEl) {
      this.messageService.dismisActiveControllers('modal');
      return false;
    } else if (pickerActiveEl) {
      this.messageService.dismisActiveControllers('picker');
      return false;
    } else if (actionSheetActiveEl) {
      this.messageService.dismisActiveControllers('picker');
      return false;
    } else if (popover) {
      this.messageService.dismissPopover();
    } else if (
      url === '/' ||
      url === `/tabs/home` ||
      url === `/tabs/bookmarks` ||
      url === `/tabs` ||
      url === `/tabs/lessons`
    ) {
      this.onExitApp();
    } else {
      this.navController.pop().then(() => {
        console.log('hello hello');
      });
    }
  }

  onExitApp() {
    if (this.counterExitApp === 0) {
      this.counterExitApp++;
      this.messageService.presentToast('Press back again to exit app');
      setTimeout(() => {
        this.counterExitApp = 0;
      }, 5000);
      return false;
    } else {
      this.backButtonSubscription.unsubscribe();
      navigator['app'].exitApp();
      return false;
    }
  }

  async initializeImageCacheDirectory() {
    await this.fileService.createDirectory(
      environment.cache_folder,
      this.fileService.DataDirectoryBasePath
    );
  }
}
