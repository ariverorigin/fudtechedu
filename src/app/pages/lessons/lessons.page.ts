import { SharedDataService } from 'src/app/utilities/services/shared-data.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { APIService, MessageService } from 'src/app/utilities/services';
import { INoItemConfig, IProduct } from 'src/app/utilities/interfaces';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { STORAGE_KEY } from 'src/app/utilities/configs/storage.key';
import {
  DateFormats,
  ErrorMessagesEnum,
  NoItemViewType,
} from 'src/app/utilities/enum';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit {
  loading: boolean;
  onSearch: boolean;
  searchData: IProduct[];
  now = moment();
  lessonTimeStamp = moment().format();

  constructor(
    private apiService: APIService,
    private sharedDataService: SharedDataService,
    private navController: NavController,
    private storage: Storage,
    private messageService: MessageService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    if (!this.sharedDataService.selectedCategory) {
      this.navController
        .pop()
        .then(() =>
          this.messageService.presentToast('Please select category.')
        );
    }
    setInterval(() => (this.now = moment()), 1);
    this.fetchData();
  }

  doRefresh(refresher: any) {
    this.sharedDataService.lessons = [];
    this.fetchData(null, refresher);
  }

  async fetchData(q?: string, refresher?: any) {
    this.loading = true;
    setTimeout(() => {
      refresher ? refresher.target.complete() : null;
    }, 100);

    const params = {
      search: q,
      status: 'publish',
      per_page: 100,
      category: this.SelectedCategory.id,
    };

    const tempStorageKey = `${STORAGE_KEY.LESSONS}_${this.SelectedCategory.id}`;
    const tempLessonTimestampKey = `${STORAGE_KEY.TIMESTAMP_LESSONS}_${this.SelectedCategory.id}`;

    const tempLessonsLocal = await this.storage.get(tempStorageKey);

    const tempLessonTimestamp = await this.storage.get(tempLessonTimestampKey);

    this.lessonTimeStamp = tempLessonTimestamp || this.lessonTimeStamp;

    if (!tempLessonsLocal || refresher || q) {
      this.apiService.getData('products', params).subscribe(
        (response) => {
          if (!q) {
            response = response
              ? response.sort((a, b) => a.menu_order - b.menu_order)
              : [];
            this.storage.set(tempStorageKey, response);
            this.sharedDataService.lessons = response ? response : [];
            this.lessonTimeStamp = moment().format();
            this.storage.set(tempLessonTimestampKey, this.lessonTimeStamp);
          } else {
            this.searchData = response;
          }
          this.loading = false;
        },
        async (e) => {
          this.sharedDataService.lessons = tempLessonsLocal;
          if (q) {
            this.searchData = await this.searchDataViaLocal(q);
          }
          e === environment.connection_error
            ? null
            : this.messageService.presentToast(ErrorMessagesEnum.Default);
          this.loading = false;
        }
      );
    } else {
      if (!q) {
        this.sharedDataService.lessons = tempLessonsLocal;
      } else {
        this.searchData = null;
      }
      this.loading = false;
    }
  }

  onClickItem(item: IProduct) {
    this.sharedDataService.selectedLesson = item;
    this.navController.navigateForward('details');
  }

  searchDataViaLocal(q: string) {
    return (this.sharedDataService.lessons || []).filter(
      (obj) =>
        obj.name.includes(q) ||
        obj.description.includes(q) ||
        obj.short_description.includes(q)
    );
  }

  onClickSearchButton() {
    this.onSearch = true;
    setTimeout(() => {
      this.elementRef.nativeElement.querySelector('ion-searchbar').setFocus();
    }, 500);
  }

  onClickCancelSearch() {
    this.searchData = null;
    this.onSearch = false;
  }

  async onInputSearchBar(event: any) {
    const q = event && event.target ? event.target.value : null;
    this.loading = true;
    this.searchData = await this.searchDataViaLocal(q);
  }

  onClearSearchBar() {
    this.searchData = null;
  }

  get Data() {
    return this.searchData || this.sharedDataService.lessons || [];
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

  get IsMoreThanSixHoursCache() {
    return this.Now.diff(moment(this.lessonTimeStamp), 'minutes') > 30;
  }

  get Now() {
    return this.now;
  }

  get LessonTimestamp() {
    return this.lessonTimeStamp;
  }

  get DateFormats() {
    return DateFormats;
  }

  get SelectedCategory() {
    return this.sharedDataService.selectedCategory;
  }
}
