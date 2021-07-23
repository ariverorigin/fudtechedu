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
import { CustomProductMetaKeyEnum, DateFormats } from 'src/app/utilities/enum';
import * as moment from 'moment';

@Component({
  selector: 'app-lesson-item',
  templateUrl: './lesson-item.component.html',
  styleUrls: ['./lesson-item.component.scss'],
})
export class LessonItemComponent implements OnInit, OnChanges {
  @Input() item: IProduct;
  @Input() view: 'list' | 'column' = 'list';
  @Output() onClick: EventEmitter<IProduct> = new EventEmitter();

  videoUrl: string;
  exerciseUrl: string;

  constructor(
    private wooService: WooService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {
    this.videoUrl = this.sharedDataService.getMetaDataByKey(
      CustomProductMetaKeyEnum.VideoUrl,
      this.item.meta_data,
      true
    );
    this.videoUrl =
      this.videoUrl && this.sharedDataService.isValidURL(this.videoUrl)
        ? this.videoUrl
        : null;
    this.exerciseUrl = this.sharedDataService.getMetaDataByKey(
      CustomProductMetaKeyEnum.ExerciseUrl,
      this.item.meta_data,
      true
    );
    this.exerciseUrl =
      this.exerciseUrl && this.sharedDataService.isValidURL(this.exerciseUrl)
        ? this.exerciseUrl
        : null;
  }

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

  get CreatedNotEqualToUpdated() {
    return (
      moment(this.item.date_created).format(DateFormats.YearDashMonthDashDay) !=
      moment(this.item.date_modified).format(DateFormats.YearDashMonthDashDay)
    );
  }

  get DateFormats() {
    return DateFormats;
  }
}
