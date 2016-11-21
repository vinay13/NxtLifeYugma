import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

import { Configuration } from './app.constants';

import { SafeHttp } from './safe-http';


@Injectable()
export class AuthService {
  
  private actionUrl: string;
  private access_token: string;

  constructor(private _http : Http,
              private safeHttp: SafeHttp,
              private toastCtrl: ToastController,
              private _configuration: Configuration) {
    this.actionUrl = _configuration.Server;
  }

  private handleError(err: any): Promise<any> {
    return Promise.reject(err || 'Server error');
  }
  
  getUser(phoneNo: number) {
    return this.safeHttp.get(this.actionUrl + "/login/parent/" + phoneNo)
      .then(res => { return Promise.resolve(res) })
      .catch(err => {
        if (err.status == 0) {
          this.safeHttp.ErrorMessage();
        } else {
          return Promise.reject(err);
        }
      });
  }

  public getParentInfo() {
    return this.safeHttp.get(this.actionUrl + "/parent/info?access_token=" + localStorage.getItem("access_token"))
      .then(res => { return Promise.resolve(res) })
      .catch(err => {
        if (err.status == 0) {
          this.safeHttp.ErrorMessage();
        } else {
          return Promise.reject(err);
        }
      })
  }

  public storeParentData(parent) {
    localStorage.setItem("id", parent.id);
    localStorage.setItem("name", parent.name);
    localStorage.setItem("email", parent.email);
    localStorage.setItem("contactNo", parent.contactNo);
    localStorage.setItem("students", JSON.stringify(parent.students));
    localStorage.setItem("nickName", parent.nickName);
  }

  // verifyOtp(phoneNo: number, otp: string) {
  //   let data = {
  //     username: phoneNo,
  //     password: otp
  //   }
  //   return this._http.post(this.actionUrl + "/login/parent" , data )
  //     .toPromise()
  //     .then(response => {
  //       response.json();
  //       this.access_token = response.json().access_token;
  //       localStorage.setItem('access_token', response.json().access_token);
  //     })
  //     .catch(this.handleError);
  //   }

  private data;

  verifyOtp(phoneNo: number, otp: string) {
    this.data = {
      username: phoneNo,
      password: otp
    }
    return this.safeHttp.post(this.actionUrl + "/login/parent", this.data )
      .then(response => {
        console.log("res2", response)
        this.access_token = response.json().access_token;
        localStorage.setItem('access_token', response.json().access_token);
        return Promise.resolve(response)
      })
      .catch(err => {
        console.log("err2", err)
        if (err.status == 0) {
          this.safeHttp.ErrorMessage();
        } else {
          return Promise.reject(err);
        }
      });
    }

}