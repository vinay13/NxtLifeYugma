import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Configuration } from './app.constants';

@Injectable()
export class ComplaintService {

  private actionUrl: string;
  private headers: any;

  constructor(private http : Http,
              private configuration: Configuration) {

    this.actionUrl = configuration.Complaint;
    this.headers = configuration.header();

  }

  private handleError(err: any): Promise<any> {
    return Promise.reject(err || 'Server error');
  }

  
  // public getTeachers(standardId) {
  //   console.log("QQ", this.headers)
  //   return this.http.get(this.actionUrl + "/teacher/" + standardId, { headers: this.headers })
  //     .toPromise()
  //     .then(res => { res.json(); }).catch(this.handleError);
  // }

  public getTeachers(standardId) {
    return this.http.get(this.actionUrl + "/teacher/" + standardId + "?access_token=" + localStorage.getItem ("access_token"))
      .toPromise()
      .then(res => { res.json(); }).catch(this.handleError);
  }

}