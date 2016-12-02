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
  emptyComments = false;

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
    this.cmplService.getComments(this.complaintId).then(response => {
      if (response.status === 204) {
        this.emptyComments = true;
      } else {
        this.emptyComments = false;
        this.comments = response.json();
      }
    });
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  postComment() {
    if (!this.ComplaintComment.valid) {
      console.log("not valid form");
    } else {
      this.comments.push({
        createdAt: new Date(),
        employeeName: null,
        comment: this.ComplaintComment.value.comment,
        employeeId: null,
        parentName: localStorage.getItem("name"),
        parentId: localStorage.getItem("id")
      });
      this.cmplService.postComment(this.complaintId, this.ComplaintComment.value).then(res => {
        this.ComplaintComment.reset();
      });
    }
  }

}
