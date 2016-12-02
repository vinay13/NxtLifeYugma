import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ActionSheetController, ItemSliding } from 'ionic-angular';

import { newComplaintModal } from './new/newComplaintModal';
import { viewComplaintModal } from './view/viewComplaintModal';
import { CommentModal } from './comment/comment.modal';

import { ComplaintService } from '../../service/complaint.service';

import * as _ from 'underscore';

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
      if (newComplaint) {
        this.complaints.unshift(newComplaint);
      }
     });
    complaintModal.present();
  }

  currentPage: number = 1;

  ngOnInit() {
    this.complaintService.getComplaints(this.currentPage).then(response => {
      if (response.status === 204) {
        this.EmptyComplaints = true;
      } else {
        this.EmptyComplaints = false;
        this.complaints = response.json();
      }
    });
  }

  viewComplaint(complaint): void {
    let viewComplaint = this.modalCtrl.create(viewComplaintModal, {complaint: complaint});
    viewComplaint.present();
  }

  openCommentModal(slidingItem: ItemSliding, complaint): void {
    slidingItem.close();
    let Comment = this.modalCtrl.create(CommentModal, {complaintId: complaint.id});
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
    if (this.currentPage < 3) {
      setTimeout(() => {
        this.complaintService.getComplaints(this.currentPage).then(response => {
          for (var i = 0; i < response.json().length; i++) {
            this.complaints.push(response.json()[i]);
          }
        });
        infiniteScroll.complete();
      }, 500);
    } else {
      infiniteScroll.complete();
    }
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

}
