import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Configuration } from './app.constants';

import { SafeHttp } from './safe-http';

@Injectable()
export class ComplaintService {

  private actionUrl: string;
  private headers: any;

  constructor(private http : Http,
              private safeHttp: SafeHttp,
              private configuration: Configuration) {

    this.actionUrl = configuration.ComplaintUrl();
    this.headers = configuration.header();

  }

  public getTeachers(standardId) {
    console.log("QQ", this.headers)
    return this.safeHttp.get(this.actionUrl + "/teacher/" + standardId)
      .then(res => { return Promise.resolve(res) })
      .catch(err => {
        if (err.status == 0) {
          this.safeHttp.ErrorMessage();
        } else {
          return Promise.reject(err);
        }
      });
  }

  public getCategories() {
    return this.safeHttp.get(this.actionUrl + "/category" + "?access_token=" + localStorage.getItem ("access_token"))
      .then(res => {
         return Promise.resolve(res);
      })
      .catch(err => {
        console.log("err in get categories", err)
        if (err.status == 0) {
          this.safeHttp.ErrorMessage();
        } else {
          return Promise.reject(err);
        }
      });
  }

  public saveComplaint(newComlaint): any {
    return this.safeHttp.post(this.actionUrl, newComlaint)
      .then(response => {
        console.log("res2", response)
        return Promise.resolve(response)
      })
  }

}