import { IProduct } from 'src/app/utilities/interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class SharedDataService {
    lessons: IProduct[];

    constructor(){}

    stripHtml(html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return (tmp.textContent || tmp.innerText || "").replace(
        /(\r\n|\n|\r)/gm,
        ""
        );
    }
}