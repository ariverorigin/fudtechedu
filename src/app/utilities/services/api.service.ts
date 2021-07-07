import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as QueryString from 'query-string';
import { NetworkService } from './network.service';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { WooService } from './woo.service';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { from } from 'rxjs';

@Injectable()
export class APIService {
  constructor(
    private networkService: NetworkService,
    private httpClient: HttpClient,
    private wooService: WooService,
    private http: HTTP,
    private platform: Platform
  ) {}

  prepareUrl(slug: string, type: 'get' | 'post' | 'put' | 'delete' = 'get') {
    const request = this.wooService.api._request2(type, slug);
    let params = null;
    if (this.wooService.apiUrl.includes('https://')) {
      params = {
        consumer_key: this.wooService.key,
        consumer_secret: this.wooService.secret,
      };
    } else {
      params = {
        oauth_consumer_key: request.qs.oauth_consumer_key,
        oauth_nonce: request.qs.oauth_nonce,
        oauth_signature: request.qs.oauth_signature,
        oauth_signature_method: request.qs.oauth_signature_method,
        oauth_timestamp: request.qs.oauth_timestamp,
        oauth_version: request.qs.oauth_version,
      };
    }

    const queryParams = params ? QueryString.stringify(params) : '';

    return {
      url: `${request.url}?${queryParams}`,
      headers: request.headers,
    };
  }

  getDataViaUrl(url, param): Observable<any> {
    if (this.networkService.isConnected) {
      if (this.platform.is('cordova')) {
        return from(
          new Promise((resolve, reject) => {
            this.http
              .get(url, param || {}, this.Header.headers)
              .then((response) => {
                resolve(JSON.parse(response.data));
              })
              .catch((e) => {
                reject(e);
              });
          })
        );
      } else {
        const queryParams = QueryString.stringify(param),
          tempURL = !queryParams ? url : `${url}&${queryParams}`;
        return this.httpClient.get(`${tempURL}`, this.Header);
      }
    } else {
      return Observable.throw(environment.connection_error);
    }
  }

  getData(slug?: string, data?: any): Observable<any> {
    const request = this.prepareUrl(slug, 'get');
    // url = includeBaseUrl ? `${this.BaseUrl}${url}` : url;
    // const qry = QueryString.stringify(data),
    //   endpointUrl = !qry ? url : `${url}?${qry}`;

    if (!this.networkService.isConnected) {
      if (this.platform.is('cordova')) {
        return from(
          new Promise((resolve, reject) => {
            Object.keys(data).map((k) => {
              data[k] = (data[k] || '').toString();
            });

            this.http
              .get(request.url, data || {}, this.Header.headers)
              .then((response) => {
                resolve(JSON.parse(response.data));
              })
              .catch((e) => {
                reject(e);
              });
          })
        );
      } else {
        const queryParams = QueryString.stringify(data),
          url = !queryParams ? request.url : `${request.url}&${queryParams}`;
        console.log(queryParams, data);
        return this.httpClient.get(`${url}`, {
          headers: {},
        });
      }
    } else {
      return throwError(environment.connection_error);
    }
  }

  postData(url: string, data: any): Observable<any> {
    if (this.networkService.isConnected) {
      return this.httpClient.post<any>(
        `${this.BaseUrl}${url}`,
        data,
        this.Header
      );
    } else {
      return Observable.throw(environment.connection_error);
    }
  }

  putData(url: string, data: any): Observable<any> {
    if (this.networkService.isConnected) {
      return this.httpClient.put<any>(
        `${this.BaseUrl}${url}`,
        data,
        this.Header
      );
    } else {
      return Observable.throw(environment.connection_error);
    }
  }

  deleteData(url: string): Observable<any> {
    if (this.networkService.isConnected) {
      return this.httpClient.delete<any>(`${this.BaseUrl}${url}`, this.Header);
    } else {
      return Observable.throw(environment.connection_error);
    }
  }

  get BaseUrl() {
    return environment.api;
  }

  get BaseKey() {
    return environment.api_key;
  }

  get BaseSecret() {
    return environment.api_secret;
  }

  get Header() {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  get IsHTTPS() {
    return this.BaseUrl.indexOf('https://') != -1;
  }
}
