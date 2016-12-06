import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ActionSheetController, ItemSliding } from 'ionic-angular';

import { newComplaintModal } from './new/newComplaintModal';
import { viewComplaintModal } from './view/viewComplaintModal';
import { CommentModal } from './comment/comment.modal';

import { ComplaintService } from '../../service/complaint.service';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'complaint.html'
})

export class ComplaintPage implements OnInit {

  complaints;
  EmptyComplaints = false;

  constructor(public modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private actionSheetCtrl: ActionSheetController,
              private complaintService: ComplaintService) {

  }

  open(): void {
    let complaintModal = this.modalCtrl.create(newComplaintModal);
    complaintModal.onDidDismiss(newComplaint => {
      if (!newComplaint) { return; }
      if (this.complaints.length != 0) {
        this.EmptyComplaints = false;
        this.complaints.unshift(newComplaint);
      } else {
        this.EmptyComplaints = false;
        this.complaints.push(newComplaint);
      }
    });
    complaintModal.present();
  }

  currentPage: number = 1;

  ngOnInit() {
    this.complaintService.getComplaints(this.currentPage).then(complaints => {
      if (complaints.status === 204) {
        this.EmptyComplaints = true;
      } else {
        this.EmptyComplaints = false;
        this.complaints = complaints.json();
      }
    });
  }

  viewComplaint(complaint): void {
    let viewComplaint = this.modalCtrl.create(viewComplaintModal, {complaint: complaint});
    viewComplaint.present();
  }

  openCommentModal(slidingItem: ItemSliding, complaint): void {
    slidingItem.close();
    let Comment = this.modalCtrl.create(CommentModal, {complaint: complaint});
    Comment.present();
  }

  showPrompt(slidingItem: ItemSliding, complaint) {
    let prompt = this.alertCtrl.create({
      title: 'Why you want to close this complaint?',
      message: "",
      inputs: [
        {
          name: 'comment',
          placeholder: 'Write short description'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            slidingItem.close();
          }
        },
        {
          text: 'Save',
          handler: data => {
            slidingItem.close();
            this.presentActionSheet(complaint, data);
          }
        }
      ]
    });
    prompt.present();
  }

  presentActionSheet(complaint, closeComplaintReason) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Close Complaint ?',
      buttons: [
        {
          text: 'Submit',
          icon: 'ios-paper-outline',
          handler: () => {
            this.complaintService.closeComplaint(complaint.id, closeComplaintReason).then(res => {
              if (res) {
                var index = this.complaints.indexOf(complaint);
                if (index > -1) {
                  this.complaints.splice(index, 1, res.json());
                }
              }
            });
          }
        },{
          text: 'Cancel',
          icon: 'md-close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  doInfinite(infiniteScroll) {
    this.currentPage += 1;
    setTimeout(() => {
      this.complaintService.getComplaints(this.currentPage).then(response => {
        if (response.status === 204) { return; }
        console.log("response", response)
        for (var i = 0; i < response.json().length; i++) {
          this.complaints.push(response.json()[i]);
        }
      });
      infiniteScroll.complete();
    }, 1000);
  }

  getComplaints(refresher) {
    setTimeout(() => {
      this.complaintService.getComplaints(this.currentPage).then(response => {
        if (response.status === 204) {
          this.EmptyComplaints = true;
        } else {
          this.EmptyComplaints = false;
          this.complaints = response.json();
        }
      });
      refresher.complete();
    }, 2000);
  }

  satisfiedComplaint(slidingItem: ItemSliding, complaint): void {
    let prompt = this.alertCtrl.create({
      title: 'Complaint Satisfied ?',
      message: "If you are happy with the complaint resolution then click on satisfied button",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            slidingItem.close();
          }
        },
        {
          text: 'Satisfied!!',
          handler: data => {
            slidingItem.close();
            this.satisfiedActionSheet(complaint);
          }
        }
      ]
    });
    prompt.present();
  }

  satisfiedActionSheet(complaint) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Complaint Satisfied!!',
      buttons: [
        {
          text: 'Submit',
          icon: 'ios-paper-outline',
          handler: () => {
            this.complaintService.satisfiedComplaint(complaint.id).then(res => {
              if (res) {
                var index = this.complaints.indexOf(complaint);
                if (index > -1) {
                  this.complaints.splice(index, 1, res.json());
                }
              }
            });
          }
        },{
          text: 'Cancel',
          icon: 'md-close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  reopenComplaint(slidingItem: ItemSliding, complaint): void {
    let prompt = this.alertCtrl.create({
      title: 'If you are not happy with the complaint resolution then reopen complaint',
      message: "",
      inputs: [
        {
          name: 'comment',
          placeholder: 'Write short description'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            slidingItem.close();
          }
        },
        {
          text: 'Reopen!!',
          handler: data => {
            slidingItem.close();
            this.reopenActionSheet(complaint, data);
          }
        }
      ]
    });
    prompt.present();
  }

  reopenActionSheet(complaint, data) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Complaint Reopen!!',
      buttons: [
        {
          text: 'Submit',
          icon: 'ios-paper-outline',
          handler: () => {
            this.complaintService.reopenComplaint(complaint.id, data).then(res => {
              if (res) {
                var index = this.complaints.indexOf(complaint);
                if (index > -1) {
                  this.complaints.splice(index, 1, res.json());
                }
              }
            });
          }
        },{
          text: 'Cancel',
          icon: 'md-close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
