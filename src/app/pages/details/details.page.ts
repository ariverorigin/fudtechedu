import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  CustomProductMetaKeyEnum,
  ErrorMessagesEnum,
  SuccessMessagesEnum,
} from 'src/app/utilities/enum';
import { IProduct } from 'src/app/utilities/interfaces';
import {
  MessageService,
  NetworkService,
  SharedDataService,
} from 'src/app/utilities/services';
import { NativePluginService } from 'src/app/utilities/services/native-plugin.service';
import { Storage } from '@ionic/storage';
import { STORAGE_KEY } from 'src/app/utilities/configs/storage.key';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  lesson: IProduct;
  videoUrl: string;
  exerciseUrl: string;
  shortDescription: string;

  isSavedOffline: boolean;
  imagesSrc: any[];

  description: string;

  constructor(
    private sharedDataService: SharedDataService,
    private navController: NavController,
    private nativePluginService: NativePluginService,
    private networkService: NetworkService,
    private messageService: MessageService,
    private storage: Storage
  ) {}

  ngOnInit() {
    if (!this.sharedDataService.selectedLesson) {
      this.navController.pop();
    }
    this.lesson = this.sharedDataService.selectedLesson;
    this.isSavedOffline =
      (this.OfflineLessons || []).findIndex(
        (obj) => obj.id === this.lesson.id
      ) > -1;

    this.videoUrl = this.sharedDataService.getMetaDataByKey(
      CustomProductMetaKeyEnum.VideoUrl,
      this.lesson.meta_data,
      true
    );
    this.videoUrl =
      this.videoUrl && this.sharedDataService.isValidURL(this.videoUrl)
        ? this.videoUrl
        : null;
    this.exerciseUrl = this.sharedDataService.getMetaDataByKey(
      CustomProductMetaKeyEnum.ExerciseUrl,
      this.lesson.meta_data,
      true
    );
    this.exerciseUrl =
      this.exerciseUrl && this.sharedDataService.isValidURL(this.exerciseUrl)
        ? this.exerciseUrl
        : null;

    this.shortDescription = this.sharedDataService
      .stripHtml(this.lesson.short_description || '')
      .slice(0, 150);

    this.imagesSrc = this.lesson.images
      ? JSON.parse(JSON.stringify(this.lesson.images))
      : [];

    this.lesson.description = this.sharedDataService.replaceTagOnStringHtml(
      this.lesson.description,
      'img',
      'app-image-caching'
    );
  }

  watchVideo() {
    if (this.NoInternet) {
      this.messageService.presentToast(ErrorMessagesEnum.NoInternet);
      return false;
    }
    this.nativePluginService.openInAppBrowser(this.videoUrl, '_blank');
  }

  takeQuiz() {
    if (this.NoInternet) {
      this.messageService.presentToast(ErrorMessagesEnum.NoInternet);
      return false;
    }
    this.nativePluginService.openInAppBrowser(this.exerciseUrl, '_blank');
  }

  onClickSaveOffline() {
    const tempIdx = (this.OfflineLessons || []).findIndex(
      (obj) => obj.id === this.lesson.id
    );

    if (tempIdx > -1) {
      (this.OfflineLessons || []).splice(tempIdx, 1);
      this.isSavedOffline = false;
    } else {
      this.sharedDataService.offlineLessons = (
        this.OfflineLessons || []
      ).concat(this.lesson);
      this.isSavedOffline = true;
    }

    this.storage.set(STORAGE_KEY.OFFLINE_LESSON, this.OfflineLessons);
    this.messageService.presentToast(
      tempIdx > -1
        ? SuccessMessagesEnum.LessonRemovedFromOffline
        : SuccessMessagesEnum.LessonSavedFromOffline
    );
  }

  onClickShare() {
    this.nativePluginService
      .share(this.lesson.name, this.lesson.name, null, this.lesson.permalink)
      .then((response) => console.log(response));
  }

  get OfflineLessons() {
    return this.sharedDataService.offlineLessons;
  }

  get NoInternet() {
    return !this.networkService.isConnected;
  }

  get Images() {
    return this.imagesSrc;
  }

  get SliderOptions() {
    return { zoom: true, loop: false };
  }
}
