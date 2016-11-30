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

import { AuthService } from '../service/auth.service';
import { NetworkService } from '../service/network.service';

import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;

  public rootPage: any;

  pages: Array<{title: string, component: any, icon: any}>;
  account: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform,
              public authService: AuthService,
              private alertCtrl: AlertController,
              public networkService: NetworkService) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Dashboard, icon: 'ios-home-outline' },
      { title: 'Complaints', component: ComplaintPage, icon: 'ios-sad-outline' },
      { title: 'Suggestions', component: SuggestionPage, icon: 'ios-mail-outline' },
      { title: 'Appreciations', component: AppreciationPage, icon: 'ios-thumbs-up-outline' },
      { title: 'Poll', component: PollPage, icon: 'ios-stats-outline' },
      { title: 'Survey', component: SurveyPage, icon: 'ios-analytics-outline' },
      { title: 'ReportIssue', component: ReportIssuePage, icon: 'ios-bug-outline' },
    ];

    this.account = [
      { title: 'Account', component: AccountPage, icon: 'ios-contact-outline' }
    ];

  }

  initializeApp() {

    this.networkService.checkNetworkStatus();

    if (window.localStorage.getItem("access_token")) {

      this.rootPage = Dashboard;

      this.authService.getParentInfo().then(user => {
        this.authService.storeParentData(user);
      }).catch(err => {
        console.log("err", err);
        if (err.status === 401) {
          this.presentConfirm();
        }
      })

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

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Session Expired',
      message: "You're already logged in some other device. You may again login.",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Logout',
          handler: () => {
            localStorage.clear();
            this.rootPage = LoginPage;
          }
        }
      ]
    });
    alert.present();
  }
}
