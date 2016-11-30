import { Component, OnInit } from '@angular/core';

import { ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'comment-modal',
  templateUrl: 'comment.modal.html'
})

export class CommentModal  implements OnInit {

  ComplaintComment: FormGroup;
  comment: any;

  constructor(private viewCtrl: ViewController,
              private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.ComplaintComment = this.formBuilder.group({
      comment: ['', Validators.compose([Validators.required])]
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  postComment() {
    if (!this.ComplaintComment.valid) {
      console.log("not valid form");
    } else {
      console.log("valid form", this.ComplaintComment.value)
    }
  }

}
