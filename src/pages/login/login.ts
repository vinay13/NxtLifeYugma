import { Component, OnInit } from '@angular/core';

import { LoadingController, NavController, ToastController } from 'ionic-angular';

import { AuthService } from '../../service/authService';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Page1 } from '../page1/page1';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  user: any;
  user1: any;

  submitAttempt: boolean = false;
  submitAttempt2: boolean = false;

  // slideTwoForm : FormGroup;
  loginForm: FormGroup;
  loginVerifyForm: FormGroup;
  
  constructor(public navCtrl: NavController,
              public authService: AuthService,
              public loadingCtrl: LoadingController,
              private formBuilder: FormBuilder,
              public toastCtrl: ToastController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mobileNo: ['', Validators.compose([Validators.minLength(10), Validators.required])]
    });
  }

  getOtp() {
     if (!this.loginForm.valid) {
      this.submitAttempt = true;
    } else {
      
      let loader = this.loadingCtrl.create({
        content: "Authenticated..."
      });
      
      loader.present();
      
      this.authService.getUser(this.loginForm.value.mobileNo)
      .then(user => {
        this.user = user;
        loader.dismiss();
        console.log("res", this.user);
        this.loginVerifyForm = this.formBuilder.group({
          otp: ['', Validators.compose([Validators.minLength(5), Validators.required])]
        })
        
      })
      .catch(err => {
        console.log("erraaaa", err);
        if (err) {
          loader.dismiss();
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
      this.submitAttempt2 = true;
    } else {
      let loader = this.loadingCtrl.create({
        content: "Authenticated..."
      });
      loader.present();
      this.authService.verifyOtp(this.loginForm.value.mobileNo, this.loginVerifyForm.value.otp)
      .then(user => {
        this.user1 = user;
        loader.dismiss();
        console.log("verify otp", user);
      }).then(user => {
        let loader = this.loadingCtrl.create({
          content: "Setting up your profile..."
        });
        loader.present();
        this.authService.getParentInfo().then(res => {
          this.authService.storeParentData(res);
          loader.dismiss();
          this.navCtrl.push(Page1);
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
          })
      })
      .catch(err => {
        console.log("err in otp verify...", err);
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
