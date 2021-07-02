import { Component, Input, OnInit } from '@angular/core';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { FileService } from 'src/app/utilities/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-caching',
  templateUrl: './image-caching.component.html',
  styleUrls: ['./image-caching.component.scss'],
})
export class ImageCachingComponent implements OnInit {
  _src: string = '';

  @Input()
  set src(imageUrl: string) {
    console.log('SET SOURCE', imageUrl);

    const fileName = imageUrl.split('/').pop();
    const fileType = imageUrl.split('.').pop();

    if (!this.platform.is('cordova')) this._src = imageUrl;
    else {
      const imageCacheFilePath = `${this.fileService.DataDirectoryBasePath}${environment.cache_folder}`;

      this.file
        .checkFile(`${imageCacheFilePath}/`, fileName)
        .then(async (result) => {
          console.log("I'm here");
          const blobData: any = await this.getBlobData(
            `${imageCacheFilePath}/${fileName}`,
            true
          );

          this._src = `data:image/${fileType};base64,${blobData}`;
        })
        .catch(async (e) => {
          await this.storeImage(imageUrl, imageCacheFilePath, fileName);
          const blobData: any = await this.getBlobData(
            `${imageCacheFilePath}/${fileName}`
          );

          this._src = `data:image/${fileType};base64,${blobData}`;
        });
    }
  }

  @Input() skeletonHeight: string = '200px';
  @Input() skeletonWidth: string = 'auto';

  constructor(
    private file: File,
    private platform: Platform,
    private fileService: FileService
  ) {}

  ngOnInit() {}

  async getBlobData(url, isLocal?: boolean) {
    return await this.fileService.getBase64ImageFromUrl(url, isLocal);
  }

  async storeImage(url, path, fileName) {
    const blobData: any = await this.getBlobData(url);

    if (blobData) {
      this.file
        .writeFile(path, fileName, blobData)
        .then((fileResult: FileEntry) => {
          this._src = fileResult.nativeURL;
        })
        .catch((e) => {
          this._src = url;
        });
    } else {
      this._src = url;
    }
  }
}
