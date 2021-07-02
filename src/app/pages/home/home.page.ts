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
} from 'src/app/utilities/enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loading: boolean;
  constructor(
    private apiService: APIService,
    private sharedDataService: SharedDataService,
    private navController: NavController,
    private storage: Storage,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  doRefresh(refresher: any) {
    this.sharedDataService.lessons = [];
    this.fetchData(null, refresher);
  }

  async fetchData(q?: string, refresher?: any) {
    this.loading = true;
    await this.messageService.showLoading({
      message: 'Initializing...',
    });

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

    if (!tempLessonsLocal || refresher) {
      this.apiService.getData('products', params).subscribe(
        (response) => {
          this.storage.set(STORAGE_KEY.FEATURED_LESSON, response);
          this.sharedDataService.featuredLesson = response ? response : [];
          this.messageService.dismisActiveControllers('loading');
          this.loading = false;
        },
        (e) => {
          console.log(e);
          this.messageService.presentToast(ErrorMessagesEnum.Default);
          this.messageService.dismisActiveControllers('loading');
          this.loading = false;
        }
      );
    } else {
      this.sharedDataService.featuredLesson = tempLessonsLocal;
      await this.messageService.dismisActiveControllers('loading');
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
}
