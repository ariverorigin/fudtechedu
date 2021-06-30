import { SharedDataService } from 'src/app/utilities/services/shared-data.service';
import { Component, OnInit } from '@angular/core';
import { APIService, MessageService } from 'src/app/utilities/services';
import { IProduct } from 'src/app/utilities/interfaces';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { STORAGE_KEY } from 'src/app/utilities/configs/storage.key';
import { ErrorMessagesEnum } from 'src/app/utilities/enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private apiService: APIService,
    private sharedDataService: SharedDataService,
    private navController: NavController,
    private storage: Storage,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  async fetchData(q?: string) {
    await this.messageService.showLoading({
      message: 'Initializing your lessons...',
    });

    const params = {
      search: q,
      status: 'publish',
      per_page: 50,
    };

    const tempLessonsLocal = await this.storage.get(STORAGE_KEY.LESSONS);
    this.sharedDataService.offlineLessons = await this.storage.get(
      STORAGE_KEY.OFFLINE_LESSON
    );

    if (!tempLessonsLocal) {
      this.apiService.getData('products', params).subscribe(
        (response) => {
          this.storage.set('lessons', response);
          this.sharedDataService.lessons = response ? response : [];
          this.messageService.dismisActiveControllers('loading');
        },
        (e) => {
          console.log(e);
          this.messageService.presentToast(ErrorMessagesEnum.Default);
          this.messageService.dismisActiveControllers('loading');
        }
      );
    } else {
      this.sharedDataService.lessons = tempLessonsLocal;
      await this.messageService.dismisActiveControllers('loading');
    }
  }

  onClickItem(item: IProduct) {
    this.sharedDataService.selectedLesson = item;
    this.navController.navigateForward('details');
  }

  get Data() {
    return this.sharedDataService.lessons;
  }
}
