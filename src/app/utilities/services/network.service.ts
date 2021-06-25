import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { STORAGE_KEY } from '../configs/storage.key';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Injectable()
export class NetworkService {
  private _connected: boolean = true;
  public connectSubscription: Subscription;

  private _networkConnected: BehaviorSubject<boolean> = new BehaviorSubject(
    null
  );

  constructor(private network: Network, private storage: Storage) {
    if (this.network.type === 'none') {
      this._connected = false;
      this.setStatus(false);
    }
  }

  connectionListener(): void {
    this._connectSubscription();
    this._disconnectSubscription();
  }

  private _disconnectSubscription(): void {
    this.network.onDisconnect().subscribe(
      async () => {
        this._connected = false;

        this.setStatus(false);
      },
      (error) => {
        this._connected = false;
        this.setStatus(false);
      }
    );
  }

  private onlineCheck() {
    let xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      xhr.onload = () => {
        // Set online status
        console.log('online');
        this._connected = true;
        this.setStatus(true);
        resolve(true);
      };
      xhr.onerror = () => {
        // Set offine status
        console.log('offline');
        this.setStatus(false);
        this._connected = false;
        setTimeout(() => {
          this.onlineCheck();
        }, 5000);
      };
      xhr.ontimeout = () => {
        setTimeout(() => {
          this.setStatus(false);
          this._connected = false;
          this.onlineCheck();
        }, 5000);
      };
      xhr.timeout = 30000;
      xhr.open('GET', `${environment.api}`, true);
      xhr.send();
    });
  }

  private _connectSubscription(): void {
    this.network.onConnect().subscribe(
      () => {
        this.onlineCheck();
      },
      (error) => {
        console.log('ERR CON _connectSubscription');
      }
    );
  }

  setStatus(status: boolean) {
    this._networkConnected.next(status);
    this.storage.set(STORAGE_KEY.NETWORK_STATUS, status);
  }

  getNetworkType(): string {
    return this.network.type;
  }

  getNetworkStatus(): Observable<boolean> {
    return this._networkConnected.asObservable();
  }

  get isConnected() {
    return this._connected;
  }
}
