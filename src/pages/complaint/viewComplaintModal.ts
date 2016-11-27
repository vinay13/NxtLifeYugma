import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'view-complaint-modal',
  templateUrl: 'viewComplaintModal.html'
})

export class viewComplaintModal {

  complaint;

  constructor(private navParams: NavParams) {

  }

  ngOnInit() {
    this.complaint = this.navParams.get('complaint');
    console.log("complaint", this.complaint);
  }

}
