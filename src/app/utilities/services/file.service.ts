import { Injectable } from '@angular/core';
import { DirectoryEntry } from '@ionic-native/file/ngx';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(
    private file: File,
    private platform: Platform,
    private webview: WebView,
    private base64: Base64
  ) {}

  checkFileExist(filename: string, path: string): Promise<any> {
    return this.file.checkFile(path, filename);
  }

  getBase64ImageFromLocal(imagePath) {
    return new Promise((resolve, reject) => {
      this.base64.encodeFile(imagePath).then(
        (base64File: string) => {
          if (base64File) resolve(base64File.split(',')[1]);
          else reject(false);
        },
        (err) => {
          reject(false);
        }
      );
    });
  }

  async getBase64ImageFromUrl(imageUrl) {
    let res = await fetch(`${environment.heroku}${imageUrl}`);
    let blob = await res.blob();

    return new Promise((resolve, reject) => {
      let reader: any = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  createDirectory(
    dirname: string,
    path?: string,
    replace: boolean = true
  ): Promise<any> {
    path = path || this.DataDirectoryBasePath;
    return new Promise((resolve, reject) => {
      this.file
        .checkDir(path, dirname)
        .then((result) => {
          this.file
            .createDir(path, dirname, replace)
            .then((result: DirectoryEntry) => {
              resolve(true);
            })
            .catch((error) => {
              reject(false);
            });
        })
        .catch((err) => {
          this.file
            .createDir(path, dirname, replace)
            .then((result: DirectoryEntry) => {
              resolve(true);
            })
            .catch((error) => {
              reject(false);
            });
        });
    });
  }

  removeDirectory(dirname: string, path?: string): Promise<any> {
    path = path || this.DataDirectoryBasePath;

    return new Promise((resolve, reject) => {
      this.file
        .checkDir(path, dirname)
        .then((_) => {
          this.file
            .removeRecursively(path, dirname)
            .then((_) => resolve(true))
            .catch((e) => {
              reject(false);
            });
        })
        .catch((err) => reject(false));
    });
  }

  removeFile(filename: string, path?: string): Promise<any> {
    path = path || this.DataDirectoryBasePath;

    return new Promise((resolve, reject) => {
      this.file
        .checkFile(path, filename)
        .then((_) => {
          this.file
            .removeFile(path, filename)
            .then((_) => resolve(true))
            .catch((e) => reject(e));
        })
        .catch((err) => reject(err));
    });
  }

  normalizeUrl(file: string) {
    return this.webview.convertFileSrc(file);
  }

  getStringBase64DataOnly(base64Data) {
    return base64Data.replace(/^data:image\/[a-z]+;base64,/, '');
  }

  get DataDirectoryBasePath() {
    return this.platform.is('ios')
      ? this.file.dataDirectory
      : this.file.externalDataDirectory;
  }

  get CacheDirectoryBasePath() {
    return this.file.cacheDirectory;
  }

  get DownloadPath() {
    return this.platform.is('ios')
      ? this.ExternalRootDirectory
      : this.ExternalRootDirectory + 'Download/';
  }

  get ExternalRootDirectory() {
    return this.platform.is('ios')
      ? this.file.documentsDirectory
      : this.file.externalRootDirectory;
  }
}
