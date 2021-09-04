import { Component, OnInit } from '@angular/core';
import { IReference } from 'src/app/utilities/interfaces';

@Component({
  selector: 'app-references-modal',
  templateUrl: './references-modal.page.html',
  styleUrls: ['./references-modal.page.scss'],
})
export class ReferencesModalPage implements OnInit {
  reference: IReference;

  constructor() {}

  ngOnInit() {}

  get Reference() {
    return this.reference;
  }
}
