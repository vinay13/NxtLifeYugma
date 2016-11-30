import { Component, OnInit } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ComplaintService } from '../../../service/complaint.service';

@Component({
  selector: 'comment-modal',
  templateUrl: 'comment.modal.html'
})

export class CommentModal  implements OnInit {

  ComplaintComment: FormGroup;
  comment: any;
  comments: any[];
  complaintId: number;

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private cmplService: ComplaintService,
              private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.complaintId = this.navParams.get('complaintId');
    this.ComplaintComment = this.formBuilder.group({
      comment: ['', Validators.compose([Validators.required])]
    });
    this.cmplService.getComments(this.complaintId).then(comments => {
      this.comments = comments;
      console.log(this.comments);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  postComment() {
    if (!this.ComplaintComment.valid) {
      console.log("not valid form");
    } else {
      console.log("valid form", this.ComplaintComment.value);
      this.cmplService.postComment(this.complaintId, this.ComplaintComment.value).then(res => {
        console.log("response", res)
      });
    }
  }

}
