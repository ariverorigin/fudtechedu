import { SharedDataService } from 'src/app/utilities/services/shared-data.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { APIService, MessageService } from 'src/app/utilities/services';
import { INoItemConfig, IProduct } from 'src/app/utilities/interfaces';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { STORAGE_KEY } from 'src/app/utilities/configs/storage.key';
import { NoItemViewType } from 'src/app/utilities/enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss'],
})
export class BookmarksPage implements OnInit {
  onSearch: boolean;
  searchData: IProduct[];

  constructor(
    private apiService: APIService,
    private sharedDataService: SharedDataService,
    private navController: NavController,
    private storage: Storage,
    private messageService: MessageService,
    private router: Router,
    private elementRef: ElementRef
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

    if (q) {
      this.searchData = await this.searchDataViaLocal(q);
    }
  }

  onClickItem(item: IProduct) {
    this.sharedDataService.selectedLesson = item;
    this.navController.navigateForward('details');
  }

  searchDataViaLocal(q: string) {
    return (this.sharedDataService.offlineLessons || []).filter(
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

  onInputSearchBar(event: any) {
    const q = event && event.target ? event.target.value : null;
    this.fetchData(q);
  }

  onClearSearchBar() {
    this.searchData = null;
  }

  get Data() {
    return this.searchData || this.sharedDataService.offlineLessons || [];
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
