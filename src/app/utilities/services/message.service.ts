import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import {
  AlertController,
  LoadingController,
  ActionSheetController,
  ToastController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
// import { Toast } from "@ionic-native/toast/ngx";

@Injectable()
export class MessageService {
  loadingHolder;
  toastHolder;
  popover;
  modalHolder;
  alertHolder;
  actionSheetHolder;
  showFilterHolder: boolean;
  isLoading: boolean;

  constructor(
    private alertController?: AlertController,
    private loadingController?: LoadingController,
    private actionSheetController?: ActionSheetController,
    private toastController?: ToastController,
    private modalController?: ModalController,
    private popoverController?: PopoverController,
    // private toast?: Toast,
    public platform?: Platform
  ) {}
  /**
   * This is the set up parameters for the Alert Message
   * @param title String
   * @param msg String
   * @param btn Array of String
   */
  showAlert(title: string, msg: string, btn: string[]): any {
    return this.alertController.create({
      header: title,
      subHeader: msg,
      buttons: btn,
    });
  }

  showAlertCallBack(title: string, msg: string, btnLbl: any, callback): any {
    return (this.alertHolder = this.alertController.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: btnLbl,
          handler: callback,
        },
      ],
    }));
  }

  async showAlertPrompt(inputs: Array<any>, title: string, msg: string) {
    let options = {
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          },
        },
      ],
    };

    if (inputs) {
      options = Object.assign(options, { inputs: inputs });
    }

    this.alertHolder = await this.alertController.create(options);
    await this.alertHolder.present();
  }

  async showConfirm(
    title: string,
    msg: string,
    cancelLbl: string,
    aggreeLbl: string,
    callback,
    cancellCallBack?
  ) {
    if (!cancellCallBack) {
      cancellCallBack = () => {};
    }

    this.alertHolder = await this.alertController.create({
      header: title,
      message: msg,
      mode: 'ios',
      buttons: [
        {
          text: cancelLbl,
          role: 'cancel',
          cssClass: 'text-placeholder',
          handler: cancellCallBack,
        },
        {
          text: aggreeLbl,
          cssClass: 'text-brand',
          handler: callback,
        },
      ],
    });
    await this.alertHolder.present();

    await this.alertHolder
      .onDidDismiss()
      .then((data) => (this.alertHolder = null));
  }

  async showLoading(opt?: any) {
    this.loadingHolder ? await this.dismissLoading() : null;
    opt = Object.assign(
      { mode: 'ios', cssClass: 'loader-custom', duration: 300000 },
      opt
    );
    this.loadingHolder = await this.loadingController.create(opt);
    await this.loadingHolder.present();
  }

  async dismissLoading() {
    await this.loadingController
      .dismiss()
      .then(() => (this.loadingHolder = null));
  }

  isloadingActive(loadingInstance): void {
    if (loadingInstance) {
      loadingInstance.dismiss();
    }
  }

  async showActionSheet(
    title: string,
    buttonsOptions: Array<any>,
    mode: 'ios' | 'md' = 'ios'
  ) {
    let opts = {
      buttons: buttonsOptions,
      backdropDismiss: true,
      mode: mode,
    };

    if (title) opts = Object.assign(opts, { header: title });

    this.actionSheetHolder = await this.actionSheetController.create(opts);

    this.actionSheetHolder.onDidDismiss().then((data) => {
      this.actionSheetHolder = null;
    });

    await this.actionSheetHolder.present();
  }

  /**
   * Toast MEssage
   */
  async presentToast(
    msg: string,
    showCloseButton: boolean = true,
    closeButtonText?: string,
    callback?: any
  ) {
    this.toastHolder ? await this.toastHolder.dismiss() : null;

    this.toastHolder = await this.toastController.create({
      message: msg,
      duration: 5000,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: '✖',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });

    this.toastHolder.onDidDismiss().then((result) => {
      if (result.role === 'cancel') {
        if (callback) callback();
      }
    });
    await this.toastHolder.present();
  }

  presentNativeToast(
    msg: string,
    duration: any = 'long',
    position: 'top' | 'center' | 'bottom' = 'bottom'
  ) {
    // if (this.platform.is("cordova")) {
    //   this.toast.show(msg, duration, position).subscribe((toast) => {
    //     console.log("Toast displayed", toast);
    //   });
    // } else {
    //   this.presentToast(msg, false);
    // }
  }

  /**
   * Modal
   */
  async presentModal(
    modalPage,
    cssClass?: string,
    componentProps?: any,
    opts?: any,
    callback?
  ) {
    let defaultOption = {
        component: modalPage,
        cssClass: cssClass,
        componentProps: componentProps,
        backdropDismiss: false,
      },
      options = opts ? Object.assign(defaultOption, opts) : defaultOption;

    this.modalHolder = await this.modalController.create(options);

    this.modalHolder.onDidDismiss().then((data) => {
      this.modalHolder = this.alertHolder = null;
      callback ? callback(data) : null;
    });

    await this.modalHolder.present();
  }

  async dismissModal(data?: any) {
    await this.modalController.dismiss(data);
  }

  async presentPopover(ev: any, component: any, data?: any, callback?: any) {
    if (this.popover) this.popover.dismiss();

    this.popover = await this.popoverController.create({
      component: component,
      componentProps: data,
      event: ev,
      translucent: true,
    });

    this.popover.onDidDismiss().then((data) => {
      this.popover = null;
      callback ? callback(data) : null;
    });

    return await this.popover.present();
  }

  async getActiveTopModal() {
    return (await this.modalController.getTop()) || null;
  }

  dismissPopover(data?: any) {
    if (this.popover) this.popover.dismiss(data);
  }

  dismissAlert() {
    try {
      this.alertHolder.dismiss().then(() => (this.alertHolder = null));
    } catch (e) {}
  }

  async presentToastWithOptions(
    msg: string,
    buttonText?: string,
    callback?: any
  ) {
    this.toastHolder ? await this.toastHolder.dismiss() : null;

    this.toastHolder = await this.toastController.create({
      message: msg,
      position: 'bottom',
      duration: 5000,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: buttonText,
          handler: callback,
        },
      ],
    });
    this.toastHolder.present();
  }
  dismisActiveControllers(
    ctrl?: 'loading' | 'modal' | 'alert' | 'picker' | 'action-sheet'
  ) {
    const loadingActiveEl = document.querySelector('ion-loading'),
      modalActiveEl = document.querySelector('ion-modal'),
      alertActiveEl = document.querySelector('ion-alert'),
      pickerActiveEl = document.querySelector('ion-picker'),
      actionSheetActiveEl = document.querySelector('ion-action-sheet');

    if (loadingActiveEl && (ctrl === 'loading' || ctrl === undefined)) {
      this.dismissLoading();
    } else if (modalActiveEl && (ctrl === 'modal' || ctrl === undefined)) {
      this.dismissModal();
    } else if (alertActiveEl && (ctrl === 'alert' || ctrl === undefined)) {
      this.dismissAlert();
    } else if (pickerActiveEl && (ctrl === 'picker' || ctrl === undefined)) {
      pickerActiveEl.dismiss();
    } else if (
      actionSheetActiveEl &&
      (ctrl === 'action-sheet' || ctrl === undefined)
    ) {
      this.actionSheetHolder ? this.actionSheetHolder.dismiss() : null;
    }
  }

  async AlertCtrlGetTop() {
    return (await this.alertController.getTop()) || null;
  }

  async LoadingCtrlGetTop() {
    return (await this.loadingController.getTop()) || null;
  }

  async ModalCtrlGetTop() {
    return (await this.modalController.getTop()) || null;
  }
}
