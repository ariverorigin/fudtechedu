import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-box-product',
  templateUrl: './skeleton-box-product.component.html',
  styleUrls: ['./skeleton-box-product.component.scss'],
})
export class SkeletonBoxProductComponent implements OnInit {
  @Input() noOfItemLoader: number = 4;
  @Input() view: 'column' | 'list' = 'list';

  itemLoader: Array<any>;

  constructor() { }

  ngOnInit() {
    this.itemLoader = Array(this.noOfItemLoader).fill(0).map((x, i) => i);
  }

}
