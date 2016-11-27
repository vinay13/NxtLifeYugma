import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { newComplaintModal } from './newComplaintModal';
import { viewComplaintModal } from './viewComplaintModal';

import { ComplaintService } from '../../service/complaint.service';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'complaint.html'
})

export class ComplaintPage implements OnInit {

  complaints;

  constructor(public modalCtrl: ModalController,
              private complaintService: ComplaintService) {

  }

  open(): void {
    let complaintModal = this.modalCtrl.create(newComplaintModal);
    complaintModal.present();
  }

  ngOnInit() {
    this.complaintService.getComplaints().then(complaints => {
        this.complaints = complaints;
    });
  }

  viewComplaint(complaint): void {
    let viewComplaint = this.modalCtrl.create(viewComplaintModal, {complaint: complaint});
    viewComplaint.present();
  }

}
