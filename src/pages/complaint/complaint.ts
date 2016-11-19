import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { newComplaintModal } from './newComplaintModal';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'complaint.html'
})

export class ComplaintPage {

  constructor(public modalCtrl: ModalController) {

  }

  open(): void {
    let complaintModal = this.modalCtrl.create(newComplaintModal);
    complaintModal.present();
  }

}
