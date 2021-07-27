import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IProductCategory } from 'src/app/utilities/interfaces';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input() item: IProductCategory;
  @Output() onClick: EventEmitter<IProductCategory> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    // console.log(this.item);
  }
}
