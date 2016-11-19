import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Configuration } from './app.constants';


@Injectable()
export class AuthService {
  
  private actionUrl: string;

  constructor(private _http : Http, private _configuration: Configuration) {
    this.actionUrl = _configuration.Server;
  }

  private handleError(err: any): Promise<any> {
    return Promise.reject(err || 'Server error');
  }
  
  getUser(phoneNo: number) {
    return this._http.get(this.actionUrl + "/login/parent/" + phoneNo)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public getParentInfo() {
    return this._http.get(this.actionUrl + "/parent/info?access_token=" + localStorage.getItem("access_token"))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private access_token: string;

  public storeParentData(parent) {
    localStorage.setItem("id", parent.id);
    localStorage.setItem("name", parent.name);
    localStorage.setItem("email", parent.email);
    localStorage.setItem("contactNo", parent.contactNo);
    localStorage.setItem("students", JSON.stringify(parent.students));
    localStorage.setItem("nickName", parent.nickName);
  }

  verifyOtp(phoneNo: number, otp: string) {
    let data = {
      username: phoneNo,
      password: otp
    }
    return this._http.post(this.actionUrl + "/login/parent" , data )
      .toPromise()
      .then(response => {
        response.json();
        this.access_token = response.json().access_token;
        localStorage.setItem('access_token', response.json().access_token);
      })
      .catch(this.handleError);
    }

}