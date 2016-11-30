import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ToastController } from 'ionic-angular';

import { Configuration } from './app.constants';

import { SafeHttp } from './safe-http';

import { ComplaintPage } from '../pages/complaint/complaint';

import * as PouchDB from 'pouchdb';
import * as _ from 'underscore';

@Injectable()
export class ComplaintService {

  private actionUrl: string;
  private headers: any;
  private _db;

  constructor(private http : Http,
              private safeHttp: SafeHttp,
              private toastCtrl: ToastController,
              private configuration: Configuration) {

    this.actionUrl = configuration.ComplaintUrl();
    this.headers = configuration.header();
    this._db = new PouchDB('yugma_complaint');
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

  public saveComplaint(complaintData): any {

    return this.safeHttp.post(this.actionUrl, complaintData)
      .then(response => {
        let toast = this.toastCtrl.create({
          message: 'Complaint submitted successfully..',
          duration: 5000,
          position: 'bottom'
        });
        toast.present();
        return Promise.resolve(response);
      }).catch(err => {
        if (err.status == 0) {
          this.safeHttp.ErrorMessage();
        } else {
          this.safeHttp.CustomErrorMessage();
          return Promise.reject(err);
        }
      });
  }

  public getComplaints(pageNo): any {
    return this.safeHttp.get(this.actionUrl + "/page/" + pageNo).then(complaints => {
      return Promise.resolve(complaints);
    }).catch(err => {
      console.log("err in get complaints", err)
      if (err.status == 0) {
        this.safeHttp.ErrorMessage();
      } else {
        return Promise.reject(err);
      }
    });
  }

  public closeComplaint(complaintId, complaintReason) {
    return this.safeHttp.put(this.actionUrl + "/" + complaintId + "/close", complaintReason).then(complaints => {
      let toast = this.toastCtrl.create({
        message: 'close complaint successfully..',
        duration: 5000,
        position: 'bottom'
      });
      toast.present();
      return Promise.resolve(complaints);
    }).catch(err => {
      console.log("err in get complaints", err)
      if (err.status == 0) {
        this.safeHttp.ErrorMessage();
      } else {
        this.safeHttp.CustomErrorMessage();
        return Promise.reject(err);
      }
    });
  }

  public postComment(complaintId, comment) {
    return this.safeHttp.post(this.actionUrl + "/" + complaintId + "/comment", comment).then(res => {
      return Promise.resolve(res);
    }).catch(err => {
      console.log("err in post comment ", err)
      if (err.status == 0) {
        this.safeHttp.ErrorMessage();
      } else {
        this.safeHttp.CustomErrorMessage();
        return Promise.reject(err);
      }
    });
  }

  public getComments(complaintId) {
    return this.safeHttp.get(this.actionUrl + "/" + complaintId + "/comment").then(comments => {
      return Promise.resolve(comments);
    }).catch(err => {
      if (err.status == 0) {
        this.safeHttp.ErrorMessage();
      } else {
        this.safeHttp.CustomErrorMessage();
        return Promise.reject(err);
      }
    });
  }

}
