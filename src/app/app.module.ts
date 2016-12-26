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

import { NetworkService } from '../service/network.service';
import { SafeHttp } from '../service/safe-http';
import { AuthService } from '../service/auth.service';
import { Configuration } from '../service/app.constants';
import { ParentInfo } from '../service/parentInfo';
import { ComplaintService } from '../service/complaint.service';

import { newComplaintModal } from '../pages/complaint/new/newComplaintModal';
import { viewComplaintModal } from '../pages/complaint/view/viewComplaintModal';
import { CommentModal } from '../pages/complaint/comment/comment.modal';

import { MomentModule } from 'angular2-moment/moment.module';

// import custom component
import { ListView } from '../customComponent/list/listview.component';
import { CustomNavbar } from '../customComponent/navbar.component.ts';

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
    SurveyPage,
    newComplaintModal,
    viewComplaintModal,
    CommentModal,
    ListView,
    CustomNavbar
  ],
  imports: [
    MomentModule,
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
    SurveyPage,
    newComplaintModal,
    viewComplaintModal,
    CommentModal,
    ListView,
    CustomNavbar
  ],
  providers: [AuthService, Configuration, ParentInfo, ComplaintService, NetworkService, SafeHttp]
})
export class AppModule {}
