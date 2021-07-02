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
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit {
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
      message: 'Initializing your lessons...',
    });

    setTimeout(() => {
      refresher ? refresher.target.complete() : null;
    }, 100);

    const params = {
      search: q,
      status: 'publish',
      per_page: 50,
    };

    const tempLessonsLocal = await this.storage.get(STORAGE_KEY.LESSONS);

    if (!tempLessonsLocal || refresher) {
      this.apiService.getData('products', params).subscribe(
        (response) => {
          this.storage.set(STORAGE_KEY.LESSONS, response);
          this.sharedDataService.lessons = response ? response : [];
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
      this.sharedDataService.lessons = tempLessonsLocal;
      await this.messageService.dismisActiveControllers('loading');
      this.loading = false;
    }
  }

  onClickItem(item: IProduct) {
    this.sharedDataService.selectedLesson = item;
    this.navController.navigateForward('details');
  }

  get Data() {
    return this.sharedDataService.lessons || [];
  }

  get NoRecordsConfig(): INoItemConfig {
    return {
      title: 'No lessons found',
      title_css_class: 'text-size-18',
      description: 'Please contact app administrator',
      description_css_class: 'text-placeholder',
      icon: 'ar-empty',
    };
  }

  get NoRecordsViewType() {
    return NoItemViewType;
  }
}
