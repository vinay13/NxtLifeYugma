import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PollPage } from '../poll/poll';
import { SuggestionPage } from '../suggestion/suggestion';
import { AppreciationPage } from '../appreciation/appreciation';
import { ReportIssuePage} from '../reportIssue/reportIssue';
import { SurveyPage} from '../survey/survey';
import { ComplaintPage} from '../complaint/complaint';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'homepage.html'
})

export class Dashboard {

  constructor(private navCtrl: NavController) {
  }
  
  openComplaint() {
    this.navCtrl.setRoot(ComplaintPage);
  }

  openPoll() {
    this.navCtrl.setRoot(PollPage);
  }

  openSuggestion() {
    this.navCtrl.setRoot(SuggestionPage);
  }

  openAppreciation() {
    this.navCtrl.setRoot(AppreciationPage);
  }

  openSurvey() {
    this.navCtrl.setRoot(SurveyPage);
  }

  openReportIssue() {
    this.navCtrl.setRoot(ReportIssuePage);
  }

}
