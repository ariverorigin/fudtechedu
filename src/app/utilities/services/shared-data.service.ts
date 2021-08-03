import { APIService } from './api.service';
import {
  IMetaData,
  IProduct,
  IProductCategory,
} from 'src/app/utilities/interfaces';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  lessons: IProduct[];
  lessonsTimestamp = moment().format();
  selectedLesson: IProduct;
  offlineLessons: IProduct[];
  featuredLesson: IProduct[];
  homeTimestamp = moment().format();
  banners: string[] = [];

  categories: IProductCategory[];
  categoriesTimestamp = moment().format();

  selectedCategory: IProductCategory;

  constructor(private apiService: APIService) {}

  stripHtml(html) {
    var tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return (tmp.textContent || tmp.innerText || '').replace(
      /(\r\n|\n|\r)/gm,
      ''
    );
  }

  getMetaDataByKey(key: string, metaData: IMetaData[], valueOnly?: boolean) {
    const tempMetaData = (metaData || []).find((obj) => obj.key === key);
    return tempMetaData && valueOnly ? tempMetaData.value : tempMetaData;
  }

  isValidURL(str) {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(str);
  }

  getPageBanner() {
    return new Promise((resolve, reject) => {
      const tempUrl = `${environment.api}wp-json/wp/v2/pages/35`;
      this.apiService.getDataViaUrl(tempUrl, {}).subscribe(
        (response) => {
          if (response) {
            const content = response.content.rendered,
              imgEntries = this.findTagOnStringHtml(content, 'img', true);

            for (let i = 0; i < (imgEntries || []).length; i++) {
              imgEntries[i] && imgEntries[i].src
                ? this.banners.push(imgEntries[i].src)
                : null;
            }

            resolve(this.banners || []);
          } else {
            this.banners = [];
            reject(false);
          }
        },
        (e) => {
          this.banners = [];
          reject(false);
        }
      );
    });
  }

  // searchString either tag, classname, id, etc.
  findTagOnStringHtml(html, searchString, all?: boolean) {
    const fragment = document.createDocumentFragment(),
      container = document.createElement('div');

    // container.className = "html-container";
    container.innerHTML = html;
    fragment.appendChild(container);
    return all
      ? fragment.querySelectorAll(searchString)
      : fragment.querySelector(searchString);
  }

  replaceTagOnStringHtml(html, oldTag, newTag) {
    const fragment = document.createDocumentFragment(),
      container = document.createElement('div');

    container.innerHTML = html;
    fragment.appendChild(container);

    const elements = fragment.querySelectorAll(oldTag);
    (elements || []).forEach((el) => {
      let tempNewTag = document.createElement(newTag);
      if (el && el.src && oldTag === 'img') {
        tempNewTag.setAttribute('src', el.getAttribute('src'));
        tempNewTag.setAttribute('isImageViewer', true);
      }

      if (el && el.href && oldTag === 'a') {
        tempNewTag.innerHTML = el.innerHTML;
        tempNewTag.setAttribute('class', 'text-color-primary a-tag');
        tempNewTag.setAttribute('data-link', el.href);

        tempNewTag.setAttribute(
          'data-download',
          el.getAttribute('data-download')
        );
      }

      el.parentNode.insertBefore(tempNewTag, el);
      el.parentNode.removeChild(el);
    });

    return container.innerHTML || html;
  }
}
