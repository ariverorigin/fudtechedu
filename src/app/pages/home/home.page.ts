import { SharedDataService } from 'src/app/utilities/services/shared-data.service';
import { Component, OnInit } from '@angular/core';
import { APIService, MessageService } from 'src/app/utilities/services';
import { INoItemConfig, IProduct } from 'src/app/utilities/interfaces';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { STORAGE_KEY } from 'src/app/utilities/configs/storage.key';
import {
  EButtonMode,
  ErrorMessagesEnum,
  NoItemViewType,
  DateFormats,
} from 'src/app/utilities/enum';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loading: boolean;
  loadingBanner: boolean;
  now = moment().format();

  constructor(
    private apiService: APIService,
    private sharedDataService: SharedDataService,
    private navController: NavController,
    private storage: Storage,
    private messageService: MessageService,
    private router: Router
  ) {}

  async ngOnInit(refresher?: any) {
    this.sharedDataService.featuredLesson = [];
    this.sharedDataService.banners = [];
    this.loading = true;
    this.loadingBanner = true;
    this.initializeBanner(refresher);
    await this.fetchData(null, refresher);
  }

  async initializeBanner(refresher?: any) {
    setTimeout(() => {
      refresher ? refresher.target.complete() : null;
    }, 100);
    const localBannerSrc = await this.storage.get(STORAGE_KEY.BANNERS);
    if (!localBannerSrc || refresher) {
      const result: any = await this.sharedDataService.getPageBanner();
      this.storage.set(STORAGE_KEY.BANNERS, result ? result : []);
      this.loadingBanner = false;
    } else {
      this.sharedDataService.banners = localBannerSrc || [];
      setTimeout(() => {
        this.loadingBanner = false;
      }, 100);
    }
  }

  doRefresh(refresher: any) {
    this.ngOnInit(refresher);
  }

  async fetchData(q?: string, refresher?: any) {
    setTimeout(() => {
      refresher ? refresher.target.complete() : null;
    }, 100);

    const params = {
      search: q,
      status: 'publish',
      per_page: 50,
      featured: true,
    };

    const tempLessonsLocal = await this.storage.get(
      STORAGE_KEY.FEATURED_LESSON
    );
    this.sharedDataService.featuredLesson = await this.storage.get(
      STORAGE_KEY.FEATURED_LESSON
    );

    const tempHomeTimestamp = await this.storage.get(
      STORAGE_KEY.TIMESTAMP_HOME
    );

    this.sharedDataService.homeTimestamp =
      tempHomeTimestamp || this.sharedDataService.homeTimestamp;

    if (!tempLessonsLocal || refresher) {
      this.apiService.getData('products', params).subscribe(
        (response) => {
          this.storage.set(STORAGE_KEY.FEATURED_LESSON, response);
          this.sharedDataService.featuredLesson = response ? response : [];
          this.loading = false;
          this.storage.set(STORAGE_KEY.TIMESTAMP_HOME, moment().format());
        },
        (e) => {
          this.sharedDataService.featuredLesson = tempLessonsLocal;
          this.messageService.presentToast(ErrorMessagesEnum.Default);
          this.loading = false;
        }
      );
    } else {
      this.sharedDataService.featuredLesson = tempLessonsLocal;
      this.loading = false;
    }
  }

  onClickItem(item: IProduct) {
    this.sharedDataService.selectedLesson = item;
    this.navController.navigateForward('details');
  }

  onClickGoToLessons() {
    this.router.navigateByUrl('tabs/lessons');
  }

  get Data() {
    return this.sharedDataService.featuredLesson || [];
  }

  get Banners() {
    return this.sharedDataService.banners;
  }

  get NoRecordsConfig(): INoItemConfig {
    return {
      title: 'No featured lessons found',
      title_css_class: 'text-size-18',
      description:
        'Pull to refresh to get new lessons or check the lesson listing by clicking the button below',
      description_css_class: 'text-placeholder',
      icon: 'ar-empty',
      button: {
        title: 'View all lessons',
        color: 'primary',
        mode: EButtonMode.IOS,
      },
    };
  }

  get NoRecordsViewType() {
    return NoItemViewType;
  }

  get IsMoreThanSixHoursCache() {
    return (
      moment().diff(moment(this.sharedDataService.homeTimestamp), 'hours') > 6
    );
  }

  get HomeTimestamp() {
    return this.sharedDataService.homeTimestamp;
  }

  get DateFormats() {
    return DateFormats;
  }
}
