import { IMetaData, IProduct } from 'src/app/utilities/interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  lessons: IProduct[];
  selectedLesson: IProduct;
  offlineLessons: IProduct[];
  featuredLesson: IProduct[];

  constructor() {}

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
}
