import { Component, Input, OnInit } from '@angular/core';
import { IProductCategory } from 'src/app/utilities/interfaces';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input() item: IProductCategory;

  constructor() {}

  ngOnInit() {
    console.log(this.item);
  }
}
