import { Component, Input, OnInit } from '@angular/core';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { FileService, SharedDataService } from 'src/app/utilities/services';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
@Component({
  selector: 'app-image-caching',
  templateUrl: './image-caching.component.html',
  styleUrls: ['./image-caching.component.scss'],
})
export class ImageCachingComponent implements OnInit {
  _src: any = '';
  _class: string = '';

  @Input() isImageViewer: boolean;
  @Input() isimageviewer: boolean;
  @Input() title: string;
  @Input() cover: boolean;
  @Input() cover_height: string;
  @Input() cover_width: string = '100%';

  @Input()
  set class(className: string) {
    this._class = className;
  }

  @Input()
  set src(imageUrl: string) {
    // console.log('SET SOURCE', imageUrl);

    const fileName = (imageUrl || '').split('/').pop();
    const fileType = (imageUrl || '').split('.').pop();

    if (!this.platform.is('cordova')) {
      this._src = imageUrl || this.sharedDataService.DefaultProductImageSrc;
    } else {
      const imageCacheFilePath = `${this.fileService.DataDirectoryBasePath}${environment.cache_folder}`;
      // console.log(imageCacheFilePath, fileName);

      this.file
        .checkFile(`${imageCacheFilePath}/`, fileName)
        .then(async (result) => {
          let fileData = await this.file.readAsText(
            imageCacheFilePath,
            fileName
          );

          this._src = fileData
            ? `data:image/${fileType};base64,${fileData}`
            : imageUrl;
        })
        .catch(async (e) => {
          const result = imageUrl
            ? await this.storeImage(imageUrl, imageCacheFilePath, fileName)
            : false;
          if (result) {
            let fileData = await this.file.readAsText(
              imageCacheFilePath,
              fileName
            );

            this._src = fileData
              ? this.sanitizer.bypassSecurityTrustUrl(
                  `data:image/${fileType};base64,${fileData}`
                )
              : imageUrl;
          } else {
            this._src =
              imageUrl || this.sharedDataService.DefaultProductImageSrc;
          }
        });
    }
  }

  @Input() skeletonHeight: string = '200px';
  @Input() skeletonWidth: string = 'auto';

  constructor(
    private file: File,
    private platform: Platform,
    private fileService: FileService,
    private sanitizer: DomSanitizer,
    private modalController: ModalController,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {}

  async storeImage(url, path, fileName) {
    return new Promise((resolve, reject) => {
      this.fileService
        .getBase64ImageFromUrl(url)
        .then((blobData: any) => {
          blobData = this.fileService.getStringBase64DataOnly(blobData);

          this.file
            .writeFile(path, fileName, blobData)
            .then((fileResult: FileEntry) => {
              resolve(true);
            })
            .catch((e) => {
              reject(false);
            });
        })
        .catch((e) => {
          reject(false);
        });
    });
  }

  async openViewer() {
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: this._src,
        scheme: 'dark',
        title: this.title || '',
      },
      cssClass: 'ion-img-viewer',
      backdropDismiss: true,
      keyboardClose: true,
    });

    return await modal.present();
  }
}
