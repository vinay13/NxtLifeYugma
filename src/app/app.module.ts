import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { CalendarDateFormatter,CalendarEventTitle,CalendarModule } from 'angular-calendar';

import { LoginPage } from '../pages/login/login';
import { Dashboard } from '../pages/homepage/homepage';

import { PollPage } from '../pages/poll/poll';
import { AccountPage } from '../pages/account/account';
import { SuggestionPage } from '../pages/suggestion/suggestion';
import { AppreciationPage } from '../pages/appreciation/appreciation';
import { ComplaintPage } from '../pages/complaint/complaint';
import { ReportIssuePage} from '../pages/reportIssue/reportIssue';
import { SurveyPage} from '../pages/survey/survey';
import { PlannerComponent } from '../pages/planner/planner.component';
import { EventModalPage } from '../pages/planner/view/planner-view';
import { CalendarTimelinePage } from '../pages/planner/timeline/planner-timeline';
import { CustomDateFormatter } from '../pages/planner/customDateFormatter';

import { NetworkService } from '../service/network.service';
import { SafeHttp } from '../service/safe-http';
import { AuthService } from '../service/auth.service';
import { Configuration } from '../service/app.constants';
import { ParentInfo } from '../service/parentInfo';
import { ComplaintService } from '../service/complaint.service';
import { EventService } from '../service/planner.service'; 

import { newComplaintModal } from '../pages/complaint/new/newComplaintModal';
import { viewComplaintModal } from '../pages/complaint/view/viewComplaintModal';
import { CommentModal } from '../pages/complaint/comment/comment.modal';

import { MomentModule } from 'angular2-moment/moment.module';

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
    PlannerComponent,
    EventModalPage,
    CalendarTimelinePage
  ],
  imports: [
    MomentModule,
    IonicModule.forRoot(MyApp),
    CalendarModule
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
    PlannerComponent,
    EventModalPage,
    CalendarTimelinePage
  ],
  providers: [AuthService, Configuration, ParentInfo, ComplaintService, NetworkService, SafeHttp,EventService,CalendarEventTitle,, 
     {provide: CalendarDateFormatter, useClass: CustomDateFormatter}]
})
export class AppModule {}
