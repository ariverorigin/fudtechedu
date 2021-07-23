import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(IonSlides, { static: false }) bannerSlides: IonSlides;

  @Input() banners: string[];
  @Input() loading: boolean;

  sliderOptions = {
    effect: 'fade',
    autoplay: true,
    loop: true,
  };

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  get isLoading() {
    return this.loading;
  }
}
