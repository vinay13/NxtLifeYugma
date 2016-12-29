import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ActionSheetController, ItemSliding } from 'ionic-angular';
import { Events } from 'ionic-angular';

// import modal
import { newComplaintModal } from './new/newComplaintModal';
import { viewComplaintModal } from './view/viewComplaintModal';
import { CommentModal } from './comment/comment.modal';

// import service
import { CustomService } from '../../service/customService';
import { ComplaintSuggestion } from '../../service/cs.service';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'complaint.html'
})

export class ComplaintPage implements OnInit {

  complaints;
  EmptyComplaints = false;
  currentPage: number = 1;

  // set header title
  title: string = "Complaints";

  // used in event
  public master: string = "complaint";

  constructor(public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public events: Events,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public actionSheetCtrl: ActionSheetController) {

  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getComplaints();
  }

  getComplaints() {
    this.nl.showLoader();
    this.c.getComplaints(this.currentPage).subscribe((complaints) => {
      if (complaints.status === 204) {
        this.EmptyComplaints = true;
      } else {
        this.EmptyComplaints = false;
        console.log("DSADSADSA", complaints)
        this.complaints = complaints.json();
      }
      this.nl.hideLoader();
    }, err => {
      this.nl.errMessage();
      this.nl.hideLoader();
    });
  }

  // Respond after Angular projects external content into the component's view.
  // Called once after the first NgDoCheck
  ngAfterContentInit() {
    this.events.subscribe('complaint:comment', (data) => {
      this.openCommentModal(data[0]);
    });
    this.events.subscribe('complaint:close', (data) => {
      this.openCloseModal(data[0]);
    });
    this.events.subscribe('complaint:reopen', (data) => {
      this.openReopenModal(data[0]);
    });
    this.events.subscribe('complaint:satisfied', (data) => {
      this.openSatisfiedModal(data[0]);
    });
  }

  updateArray(removeComplaint, newComplaint) {
    var index = this.complaints.indexOf(removeComplaint);
    if (index > -1) {
      this.complaints.splice(index, 1, newComplaint);
    }
  }

  newComplaint(): void {
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

  viewComplaint(complaint): void {
    let viewComplaint = this.modalCtrl.create(viewComplaintModal, {complaint: complaint});
    viewComplaint.present();
  }

  openCommentModal(complaint): void {
    let Comment = this.modalCtrl.create(CommentModal, {complaint: complaint});
    Comment.present();
  }

  openCloseModal(complaint) {
    let prompt = this.alertCtrl.create({
      title: 'Why you want to close this complaint?',
      message: "",
      inputs: [{
        name: 'comment',
        placeholder: 'Write short description'
      }],
      buttons: [{
        text: 'Cancel',
        handler: data => {}
      }, {
        text: 'Save',
        handler: data => {
          this.closeActionSheet(complaint, data);
        }
      }]
    });
    prompt.present();
  }

  closeActionSheet(complaint, closeComplaintReason) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Close Complaint ?',
      buttons: [{
        text: 'Submit',
        icon: 'ios-paper-outline',
        handler: () => {
          this.c.closeComplaint(complaint.id, closeComplaintReason).subscribe(res => {
            if (res) {
              this.updateArray(complaint, res.json());
            }
          });
        }
      }, {
        text: 'Cancel',
        icon: 'md-close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present();
  }

  loadMoreComplaints(infiniteScroll) {
    this.currentPage += 1;
    setTimeout(() => {
      this.c.getComplaints(this.currentPage).subscribe(response => {
        if (response.status === 204) { return; }
        for (var i = 0; i < response.json().length; i++) {
          this.complaints.push(response.json()[i]);
        }
      });
      infiniteScroll.complete();
    }, 1000);
  }

  loadNewComplaints(refresher) {
    this.currentPage = 1;
    setTimeout(() => {
      this.c.getComplaints(this.currentPage).subscribe(response => {
        if (response.status === 204) {
          this.EmptyComplaints = true;
        } else {
          this.EmptyComplaints = false;
          this.complaints = response.json();
        }
      });
      refresher.complete();
    }, 1000);
  }

  openSatisfiedModal(complaint): void {
    let prompt = this.alertCtrl.create({
      title: 'Complaint Satisfied ?',
      message: "If you are happy with the complaint resolution then click on satisfied button",
      buttons: [{
        text: 'Cancel',
        handler: data => {
        }
      }, {
        text: 'Satisfied!!',
        handler: data => {
          this.satisfiedActionSheet(complaint);
        }
      }]
    });
    prompt.present();
  }

  satisfiedActionSheet(complaint) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Complaint Satisfied!!',
      buttons: [{
        text: 'Submit',
        icon: 'ios-paper-outline',
        handler: () => {
          this.c.satisfiedComplaint(complaint.id).subscribe(res => {
            if (res) {
              this.updateArray(complaint, res.json());
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
      }]
    });
    actionSheet.present();
  }

  openReopenModal(complaint): void {
    let prompt = this.alertCtrl.create({
      title: 'If you are not happy with the complaint resolution then reopen complaint',
      message: "",
      inputs: [{
        name: 'comment',
        placeholder: 'Write short description'
      }],
      buttons: [{
        text: 'Cancel',
        handler: data => {
        }
      }, {
        text: 'Reopen!!',
        handler: data => {
          this.reopenActionSheet(complaint, data);
        }
      }]
    });
    prompt.present();
  }

  reopenActionSheet(complaint, data) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Complaint Reopen!!',
      buttons: [{
        text: 'Submit',
        icon: 'ios-paper-outline',
        handler: () => {
          this.c.reopenComplaint(complaint.id, data).subscribe(res => {
            if (res) {
              this.updateArray(complaint, res.json());
            }
          });
        }
      }, {
        text: 'Cancel',
        icon: 'md-close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present();
  }

}
