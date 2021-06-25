import { SharedDataService } from 'src/app/utilities/services/shared-data.service';
import * as QueryString from 'query-string';
import { Component, OnInit } from '@angular/core';
import { DUMMY_LESSON } from 'src/app/utilities/data/lessons.data';
import { APIService, WooService } from 'src/app/utilities/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private apiService: APIService, private wooService: WooService, private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.fetchData();
  }

  async fetchData(q?: string) {
    // const req: { url: string } = this.wooService.api._request2(
    //   'get',
    //   'products'
    // );

    const params = {
      search: q,
      status: 'publish',
      per_page: 50,
    };

    const response = await this.apiService
      .getData('products', params)
      .toPromise();
    this.sharedDataService.lessons = response ? response : [];
  }

  get Data() {
    return this.sharedDataService.lessons;
  }
}
