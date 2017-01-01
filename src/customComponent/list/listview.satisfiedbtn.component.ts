import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';

@Component({
  selector: 'nl-satisfied-button',
  template: `
  <div style="height:100%;">
    <button ion-button color="primary" (click)="openSatisfiedModal(complaint)" *ngIf="complaint.statusId === 4">
      <ion-icon name="ios-thumbs-up"></ion-icon>
      Satisfied
    </button>
  </div>
  `
})

export class ListViewSatisfiedButton {

  @Input() complaint;
  @Input('master') masterName: string;

  constructor(public events: Events) { }

  openSatisfiedModal(complaint) {
    console.log("DSADASD", this.masterName);
    this.events.publish(this.masterName + ':satisfied', complaint);
  }
}
