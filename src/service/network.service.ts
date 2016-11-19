import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Network } from 'ionic-native';

@Injectable()
export class NetworkService {

  constructor(private toastCtrl: ToastController) {

  }

  checkNetworkStatus() {

    Network.onDisconnect().subscribe(() => {

      let toast = this.toastCtrl.create({
        message: 'Your internet connection appears to be offline. Data integrity is guaranteed.',
        showCloseButton: true,
        closeButtonText: "Ok"
      });

      toast.onDidDismiss(() => {
        toast.dismiss();
      });

      toast.present();
    });

    Network.onConnect().subscribe(() => {

      let toast = this.toastCtrl.create({
        message: 'You are Online!',
        showCloseButton: true,
        closeButtonText: "Ok"
      });

      toast.onDidDismiss(() => {
        toast.dismiss();
      });

      toast.present();
    });

  }

}