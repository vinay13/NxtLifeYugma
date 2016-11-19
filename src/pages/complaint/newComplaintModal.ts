import { Component, OnInit } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';

import { ParentInfo } from '../../service/parentInfo';
import { ComplaintService } from '../../service/complaint.service';

@Component({
  selector: 'new-complaint-modal',
  templateUrl: 'newComplaintModal.html'
})

export class newComplaintModal implements OnInit {

  public students;
  public data;

  constructor(public viewCtrl: ViewController,
              private parentInfo: ParentInfo,
              public toastCtrl: ToastController,
              private cmplService: ComplaintService) {
    
  }

  doSomething(standardId) {
    this.cmplService.getTeachers(standardId).then(teachers => {
      console.log(teachers);
    }).catch(err => {
      let toast = this.toastCtrl.create({
        message: 'Error in getTeachers',
        duration: 5000,
        position: 'bottom'
      });
      toast.present();
    });
  }

  ngOnInit() {
    this.students = this.parentInfo.getStudents();
    console.log("SSS", typeof(this.students), this.students)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}