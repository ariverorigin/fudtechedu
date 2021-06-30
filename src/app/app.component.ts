import { Component } from '@angular/core';
import { StorageService } from './utilities/services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storageService: StorageService) {
    this.storageService.init();
  }
}
