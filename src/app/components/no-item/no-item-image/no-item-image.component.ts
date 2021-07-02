import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { INoItemConfig } from 'src/app/utilities/interfaces';

@Component({
  selector: 'app-no-item-image',
  templateUrl: './no-item-image.component.html',
  styleUrls: ['./no-item-image.component.scss'],
})
export class NoItemImageComponent implements OnInit {
  @Input() config: INoItemConfig;

  @Output() onButtonClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onBtnClick() {
    this.onButtonClick.emit(true);
  }

  get IsSVGImage() {
    return this.config.image ? this.config.image.includes('.svg') : false;
  }
}
