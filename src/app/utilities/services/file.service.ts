import { Injectable } from '@angular/core';
import { DirectoryEntry } from '@ionic-native/file/ngx';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(private file: File, private platform: Platform) {}

  checkFileExist(filename: string, path: string): Promise<any> {
    return this.file.checkFile(path, filename);
  }

  async getBase64ImageFromUrl(imageUrl, isLocal?: boolean) {
    var res = await fetch(`${!isLocal ? environment.heroku : ''}${imageUrl}`);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        return reject(false);
      };
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
              console.log('createDir err', error);
              reject(false);
            });
        })
        .catch((err) => {
          console.log('checkDir err', err);
          this.file
            .createDir(path, dirname, replace)
            .then((result: DirectoryEntry) => {
              resolve(true);
            })
            .catch((error) => {
              console.log('createDir err', error);
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
              console.log(e, 'ON ERROR');
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
