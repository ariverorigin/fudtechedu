import { Component, ElementRef, OnInit } from '@angular/core';
import { NoItemViewType } from 'src/app/utilities/enum';
import { INoItemConfig, IReference } from 'src/app/utilities/interfaces';
import { MessageService, SharedDataService } from 'src/app/utilities/services';
import { ReferencesModalPage } from '../references-modal/references-modal.page';

@Component({
  selector: 'app-references',
  templateUrl: './references.page.html',
  styleUrls: ['./references.page.scss'],
})
export class ReferencesPage implements OnInit {
  loading: boolean;
  onSearch: boolean;
  searchData: IReference[];

  constructor(
    private sharedDataService: SharedDataService,
    private elementRef: ElementRef,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  async doRefresh(refresher: any) {
    this.sharedDataService.references = [];
    this.loading = true;
    setTimeout(() => {
      refresher ? refresher.target.complete() : null;
    }, 100);
    await this.sharedDataService.getPageReferences();
    this.loading = false;
  }

  searchDataViaLocal(q: string) {
    return (this.sharedDataService.lessons || []).filter(
      (obj) => obj.name.includes(q) || obj.description.includes(q)
    );
  }

  onClickSearchButton() {
    this.onSearch = true;
    setTimeout(() => {
      this.elementRef.nativeElement.querySelector('ion-searchbar').setFocus();
    }, 500);
  }

  onClickCancelSearch() {
    this.searchData = null;
    this.onSearch = false;
  }

  onClickReferenceItem(item?: IReference) {
    this.messageService.presentModal(
      ReferencesModalPage,
      'modal-offcanvas-footer',
      { reference: item },
      {
        backdropDismiss: true,
      }
    );
  }

  async onInputSearchBar(event: any) {
    const q = event && event.target ? event.target.value : null;
    this.loading = true;
    this.searchData = await this.searchDataViaLocal(q);
  }

  onClearSearchBar() {
    this.searchData = null;
  }

  get NoRecordsConfig(): INoItemConfig {
    return {
      title: 'No reference data found',
      title_css_class: 'text-size-18',
      description: 'Please contact app administrator',
      description_css_class: 'text-placeholder',
      icon: 'ar-empty',
    };
  }

  get NoRecordsViewType() {
    return NoItemViewType;
  }

  get Data() {
    return this.sharedDataService.References || [];
  }
}
