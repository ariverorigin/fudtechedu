import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoItemViewType } from 'src/app/utilities/enum';
import { INoItemConfig } from 'src/app/utilities/interfaces';

@Component({
  selector: 'app-no-item',
  templateUrl: './no-item.component.html',
  styleUrls: ['./no-item.component.scss'],
})
export class NoItemComponent implements OnInit {
  @Input() view: string;

  @Input() config: INoItemConfig;

  @Output() onButtonClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.config = this.config || {
      description: `No records found`,
      view: NoItemViewType.List,
    };
  }

  onClick() {
    this.onButtonClick.emit();
  }

  get IsImageView() {
    return (
      (this.NoItemConfig && this.NoItemConfig.view
        ? this.NoItemConfig.view
        : this.view) === NoItemViewType.Image
    );
  }

  get IsListView() {
    return (
      (this.NoItemConfig && this.NoItemConfig.view
        ? this.NoItemConfig.view
        : this.view) === NoItemViewType.List
    );
  }

  get NoItemConfig(): INoItemConfig {
    return this.config;
  }
}
