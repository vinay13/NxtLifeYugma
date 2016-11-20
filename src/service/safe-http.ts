import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { LoadingController, AlertController, ToastController } from 'ionic-angular';

@Injectable()
export class SafeHttp {

  constructor(private http: Http,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) { }

  
  public ErrorMessage() {
    let toast = this.toastCtrl.create({
      message: 'Internal server error',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }


  get(url: string, options?: RequestOptions): Promise<any> {

    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    
    loader.present();

    return this.http.get(url, options)
      .toPromise()
      .then(response => {
        loader.dismiss();
        return Promise.resolve(response.json());
      }, function(err) {
        loader.dismiss();
        return Promise.reject(err || 'Server error');
      });
  }

}