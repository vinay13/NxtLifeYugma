import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { Dashboard } from '../pages/homepage/homepage';

import { PollPage } from '../pages/poll/poll';
import { AccountPage } from '../pages/account/account';
import { SuggestionPage } from '../pages/suggestion/suggestion';
import { AppreciationPage } from '../pages/appreciation/appreciation';
import { ComplaintPage } from '../pages/complaint/complaint';
import { ReportIssuePage} from '../pages/reportIssue/reportIssue';
import { SurveyPage} from '../pages/survey/survey';

import { AuthService } from '../service/authService';
import { Configuration } from '../service/app.constants';

@NgModule({
  declarations: [
    MyApp,
    Dashboard,
    LoginPage,
    PollPage,
    AccountPage,
    SuggestionPage,
    AppreciationPage,
    ComplaintPage,
    ReportIssuePage,
    SurveyPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Dashboard,
    LoginPage,
    PollPage,
    AccountPage,
    SuggestionPage,
    AppreciationPage,
    ComplaintPage,
    ReportIssuePage,
    SurveyPage
  ],
  providers: [AuthService, Configuration]
})
export class AppModule {}
