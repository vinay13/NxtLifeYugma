import { Component, OnInit } from '@angular/core';

import { LoadingController, NavController, ToastController, AlertController } from 'ionic-angular';

import { AuthService } from '../../service/auth.service';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Dashboard } from '../homepage/homepage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage implements OnInit {

  user: any;

  numberSubmit: boolean = false;
  otpSubmit: boolean = false;

  loginForm: FormGroup;
  loginVerifyForm: FormGroup;
  
  constructor(public navCtrl: NavController,
              public authService: AuthService,
              public loadingCtrl: LoadingController,
              private formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mobileNo: ['', Validators.compose([Validators.minLength(10), Validators.required])]
    });
  }

  getOtp() {
     if (!this.loginForm.valid) {
      this.numberSubmit = true;
    } else {
      this.authService.getUser(this.loginForm.value.mobileNo)
      .then(user => {

        this.user = user;
        this.loginVerifyForm = this.formBuilder.group({
          otp: ['', Validators.compose([Validators.minLength(5), Validators.required])]
        });

      })
      .catch(err => {
        if (err && err.status === 400) {
          let toast = this.toastCtrl.create({
            message: 'Number not registered.',
            duration: 5000,
            position: 'bottom'
          });
          toast.present();
        }
      });

    }
  }
  
  verifyOtp() {

    if (!this.loginVerifyForm.valid) {

      this.otpSubmit = true;

    } else {
  
      let loader = this.loadingCtrl.create({
        content: "Authenticated..."
      });

      loader.present();

      this.authService.verifyOtp(this.loginForm.value.mobileNo, this.loginVerifyForm.value.otp)
      .then(user => {
        loader.dismiss();
      })
      .then(user => {

        let loader = this.loadingCtrl.create({
          content: "Setting up your profile..."
        });

        loader.present();

        this.authService.getParentInfo().then(res => {

          this.authService.storeParentData(res);

          loader.dismiss();

          this.navCtrl.setRoot(Dashboard);

          let toast1 = this.toastCtrl.create({
            message: 'Account setup successfully',
            duration: 5000,
            position: 'bottom'
          });

          toast1.present();

          }).catch(err => {

          loader.dismiss();

          if (err.status === 0) {
            let toast = this.toastCtrl.create({
              message: 'Internal Serve Error.',
              duration: 5000,
              position: 'bottom'
            });
            toast.present();
          }

        });
      })
      .catch(err => {

        loader.dismiss();

        delete this.user;

        if (err.status === 0) {
          let toast = this.toastCtrl.create({
            message: 'Internal Serve Error.',
            duration: 5000,
            position: 'bottom'
          });
          toast.present();
        } else {
          let toast = this.toastCtrl.create({
            message: 'otp not match.',
            duration: 5000,
            position: 'bottom'
          });
          toast.present();
        }

      });
    }
  }

  public resendOtp(): void {
    this.getOtp();
  }

  public updateNo(): void {
    delete this.user;
  }

}
