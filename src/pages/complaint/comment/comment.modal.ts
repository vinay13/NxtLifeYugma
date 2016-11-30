import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

@Component({
  selector: 'comment-modal',
  templateUrl: 'comment.modal.html'
})

export class CommentModal {

  constructor(private viewCtrl: ViewController) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
