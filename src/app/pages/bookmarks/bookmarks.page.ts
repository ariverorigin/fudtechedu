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
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss'],
})
export class BookmarksPage implements OnInit {
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
    this.fetchData(null);
  }

  async fetchData(q?: string) {
    this.sharedDataService.offlineLessons = await this.storage.get(
      STORAGE_KEY.OFFLINE_LESSON
    );
  }

  onClickItem(item: IProduct) {
    this.sharedDataService.selectedLesson = item;
    this.navController.navigateForward('details');
  }

  get Data() {
    return this.sharedDataService.offlineLessons || [];
  }

  get NoRecordsConfig(): INoItemConfig {
    return {
      title: 'No offline data',
      title_css_class: 'text-size-18',
      description:
        'Select lesson and click the bookmark button to save offline',
      description_css_class: 'text-placeholder',
      icon: 'ar-empty',
    };
  }

  get NoRecordsViewType() {
    return NoItemViewType;
  }
}
