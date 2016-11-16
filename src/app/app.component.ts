import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { Dashboard } from '../pages/homepage/homepage';

import { SurveyPage} from '../pages/survey/survey';
import { PollPage } from '../pages/poll/poll';
import { SuggestionPage } from '../pages/suggestion/suggestion';
import { AppreciationPage } from '../pages/appreciation/appreciation';
import { ComplaintPage } from '../pages/complaint/complaint';

import { ReportIssuePage} from '../pages/reportIssue/reportIssue';

import { AccountPage } from '../pages/account/account';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;

  private rootPage: any;

  pages: Array<{title: string, component: any, icon: any}>;
  account: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: Dashboard, icon: 'map' },
      { title: 'Complaints', component: ComplaintPage, icon: 'contacts' },
      { title: 'Suggestions', component: SuggestionPage, icon: 'calendar' },
      { title: 'Appreciations', component: AppreciationPage, icon: 'information-circle' },
      { title: 'Poll', component: PollPage, icon: 'information-circle' },
      { title: 'Survey', component: SurveyPage, icon: 'map' },
      { title: 'ReportIssue', component: ReportIssuePage, icon: 'information-circle' },
    ];

    this.account = [
      { title: 'Account', component: AccountPage, icon: 'log-in' }
    ];

  }

  initializeApp() {

    if (window.localStorage.getItem("access_token")) {
      this.rootPage = Dashboard;
    } else {
      this.rootPage = LoginPage;
    }

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
