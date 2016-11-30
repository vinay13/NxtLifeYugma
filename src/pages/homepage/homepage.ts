import { Component } from '@angular/core';

import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'homepage.html'
})

export class Dashboard {

  constructor(public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
  }

}
