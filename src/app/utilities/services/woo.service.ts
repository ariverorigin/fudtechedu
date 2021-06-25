import { Injectable } from '@angular/core';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { environment } from 'src/environments/environment';

declare var WooCommerceAPI: any;

@Injectable()
export class WooService {
  api: any;
  apiUrl: string = environment.api;
  key: string = environment.api_key;
  secret: string = environment.api_secret;

  constructor() {
    this.api = WooCommerceAPI.WooCommerceAPI({
      url: this.apiUrl,
      consumerKey: this.key,
      consumerSecret: this.secret,
      version: 'wc/v3',
      wpAPI: true,
      queryStringAuth: false,
    });
  }

  get API() {
    return this.api;
  }
}
