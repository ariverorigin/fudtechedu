import { Component, OnInit, Input } from '@angular/core';
import { Platform } from '@ionic/angular';

import { INoItemConfig } from 'src/app/utilities/interfaces';

@Component({
  selector: 'app-no-item-list',
  templateUrl: './no-item-list.component.html',
  styleUrls: ['./no-item-list.component.scss'],
})
export class NoItemListComponent implements OnInit {
  @Input() config: INoItemConfig;

  constructor(private platform: Platform) {}

  ngOnInit() {}

  get isPlatformIpad() {
    return this.platform.is('ipad');
  }

  get isPlatformTablet() {
    return this.platform.is('tablet');
  }

  get isPlatformLandscape() {
    return this.platform.isLandscape();
  }

  get isAndroid() {
    return this.platform.is('android');
  }

  get isIos() {
    return this.platform.is('ios');
  }
}
