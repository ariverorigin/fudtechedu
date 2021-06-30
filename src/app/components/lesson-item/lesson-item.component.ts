import { SharedDataService } from 'src/app/utilities/services/shared-data.service';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { DEFAULT_CONFIGS } from 'src/app/utilities/data/constants.data';
import { WooService } from 'src/app/utilities/services';
import { IProduct } from 'src/app/utilities/interfaces';

@Component({
  selector: 'app-lesson-item',
  templateUrl: './lesson-item.component.html',
  styleUrls: ['./lesson-item.component.scss'],
})
export class LessonItemComponent implements OnInit, OnChanges {
  @Input() item: IProduct;
  @Input() view: 'list' | 'column' = 'list';
  @Output() onClick: EventEmitter<IProduct> = new EventEmitter();

  constructor(
    private wooService: WooService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      JSON.stringify(changes.item.currentValue) !==
      JSON.stringify(changes.item.previousValue)
    ) {
      this.formatProducts();
    }
  }

  formatProducts() {
    this.item.short_description = this.sharedDataService.stripHtml(
      this.item.short_description || ''
    );
    // this.item.short_description = (this.item.short_description || "").substring(0, 150);
  }

  getFilename(str) {
    return str.split('\\').pop().split('/').pop();
  }

  onClickItem(item: IProduct) {
    this.onClick.emit(item);
  }

  get DefaultThumbnail() {
    return DEFAULT_CONFIGS.Thumbnail;
  }
}
