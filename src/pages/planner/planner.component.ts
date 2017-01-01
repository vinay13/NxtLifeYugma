import {Component,OnInit} from '@angular/core'; 
import {
  
  startOfDay,
  subDays,
  addDays,
  isSameDay,
  isSameMonth,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  getMonth,
  getYear
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { NavController, NavParams,ToastController,AlertController,LoadingController} from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { EventModalPage } from './view/planner-view';
import { EventService } from '../../service/planner.service'; 
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import {CalendarTimelinePage} from './timeline/planner-timeline';
import {Events} from 'ionic-angular';











const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#a2d1ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#fefe7a',
    secondary: '#FDF1BA'
  },
  orange:{
  	primary: '#e34ddd',
  	secondary: '#FD2A3E'
  },
  green:{
    primary: 'lime',
    secondary: '#228B22  '
  },
  purple:{
    primary: '#e34dde',
    secondary: '#F454e3'
  }
};


interface MyEvent extends CalendarEvent {
  id: number;
}



@Component({
    selector : 'planner-page',
    styles: [`
    h3 {
      margin: 0;
    }
    .container {
      padding-bottom: 50px;
    }
  `],
    templateUrl: 'planner-page.html',
    providers: [EventService]
})




export class PlannerComponent implements OnInit {

public title : string = "planner";
  public ResponseData = [];
  public a;
  
  public eventMonth;
  public clickdate:Date;
  public value = {};
  public resdata;
  public userID;
  //public Eventvalue = {'id':'','start':'','end':'','title':'','actions':''};

  constructor(public eventservice: EventService,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private http: Http,
    public _events: Events,
    public _toastCtrl : ToastController,
    public _alertCtrl: AlertController,
    public _loadingCtrl: LoadingController ){
    

    
 }  
//     this._events.subscribe('events:created', 
//    (data) => {
      
//        this.loll(data);
//        console.log("DSFFDF", data)
//       // console.log("this.value",this.value[0].start);
//    });


    // this._events.subscribe('events:edited', 
   	// 		(data) => { this.doll(data);
    //   				console.log("_events subscribe calender view", data);
     
  	// 	});
   
  


// events2: MyEvent[] = [{
//   id: 2,
//   title: '',
//   start: new Date(),
//   color: {primary: '', secondary: ''}
 
  
// }] 





  view: string = 'month';
  year: number;
  month: number;
  day : number;
  viewDate: Date = new Date();



    actions2: CalendarEventAction[] = [{
      

      label: '<i>view</i>',
      onClick: ({event}:{event}): void => {
         let modal = this.modalCtrl.create(EventModalPage,{eventId:event.id});
         modal.present();
      //  console.log('Edit event', event.id);
      }
    }];





    actions: CalendarEventAction[] = [{
      

      label: '<i>view</i>',
      onClick: ({event}:{event}): void => {
         let modal = this.modalCtrl.create(EventModalPage,{eventId:event.id});
         modal.present();
      //  console.log('Edit event', event.id);
      }
    },
    {
      
        label: '<i>delete</i>',
        onClick: ({event}:{event}): void => {
          
           
      
            let alert = this._alertCtrl.create({
            title: 'Delete event',
        message: 'Do you want to delete this event?',
        buttons: [
            {
                text: 'No',
              role: 'No',
              handler: () => {
                
                 console.log('No clicked');
                 // return 0;
              }
            },
            {
              text: 'Yes',
              handler: () => {
               this.eventservice.deleteEvent(event.id).subscribe(  data => {this.resdata = data,  this.DeleteEventToast()});
              
              this.events2 = this.events2.filter(iEvent => iEvent !== event);

                  console.log('Yes clicked');
                 // return true;
              }
            }
        ]
      });
      alert.present();
      
        }
    
    }];


 

   DeleteEventToast(){
          let toaste = this._toastCtrl.create({
            message: 'Event deleted successfully',
             duration: 3000
          });
        toaste.present();
        console.log('toast');
  }


  refresh: Subject<any> = new Subject();

 
   AllEvents(){
     
      console.log('eventMonth',this.eventMonth);
       let loader = this._loadingCtrl.create({
             content: "Please wait..."
        });
        loader.present();
     this.eventservice.GetEvents(this.eventMonth)
     .subscribe(
         data => { this.ResponseData = data; this.ABC(); loader.dismiss(); },
         err => console.error(err),
         () => console.log('done',this.ResponseData),
      )
     
  }


 
  events2 = [];
  ABC(){

    for(let i=0;i<this.ResponseData.length;i++){
        this.ResponseData[i].color = colors[this.ResponseData[i].color];
         this.ResponseData[i].start = startOfDay(this.ResponseData[i].start);
         this.ResponseData[i].end = startOfDay(this.ResponseData[i].end);
         this.ResponseData[i].actions = this.actions2;
       }
   
     this.events2 = this.ResponseData;
     console.log('this.actions',this.actions[0]);
     console.log('id',this.events2);
    
  }


loll(data){
  
     data[0].id = data[0].id;
      data[0].color = colors[data[0].color];
      data[0].title = data[0].title;
      data[0].start = startOfDay(data[0].start);
      data[0].end = startOfDay(data[0].end);
      data[0].actions = this.actions;


      this.events2.push(data[0]);
      this.refresh.next(true);
      console.log(this.events2);
      console.log('this.valuedd',data[0]);
    

}


doll(data){

      data[0].id = data[0].id;
      data[0].color = colors["blue"];
      data[0].title = data[0].title;
      data[0].start = data[0].startDate +  data[0].startTime;
      data[0].end = data[0].endDate+data[0].endTime ;
      data[0].actions = this.actions;


     // this.events2 = data[0];
     // this.refresh.next(true);
      console.log(this.events2);
      console.log('this.valuedd doll',data[0]);


}

    
     XYZ(){
       console.log('ABC',this.ABC());
       this.ABC();
       return this.ResponseData;
     }
    


  activeDayIsOpen: boolean = false;

  increment(): void {

    
    const addFn: any = {
      day: addDays,
      week: addWeeks,
      month: addMonths
    }[this.view];

     
     // console.log('month1',this.viewDate);
    this.viewDate = addFn(this.viewDate, 1);
    this.showMonth();
    console.log('month',this.viewDate);
   // console.log('year',getYear(this.viewDate));
  }


  showMonth(){

  this.eventMonth = getYear(this.viewDate) + "-" + (getMonth(this.viewDate)+1);

    console.log('hehehViewDate',this.eventMonth);
    this.AllEvents();
  }



  decrement(): void {


    const subFn: any = {
      day: subDays,
      week: subWeeks,
      month: subMonths
    }[this.view];

    this.viewDate = subFn(this.viewDate, 1);
    this.showMonth();
  }

  today(): void {
    this.viewDate = new Date();
  }



  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
        
        this.clickdate = date ;
        console.log('DayClicked',this.clickdate);
        console.log('DayClicked',date);

      } else {
        this.activeDayIsOpen = true;
        this.clickdate = date ;
        console.log('haahhahaha',date);
        this.viewDate = date;
        
      }
    }
  }


  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }


  CalendarTimeline(event,item){
    this.navCtrl.push(CalendarTimelinePage,{

    });
  }



//   AddEvent(clickdate) {
//     this.navCtrl.push(AddEventPage, {
//       clickdate : this.clickdate
//     });
//   }




  OpenModal(){
    let modal = this.modalCtrl.create(EventModalPage);
       modal.present();
  }


  //userEventData = [];



  





  eventClicked(event) {
      //console.log('Clicked', event);
   };

  
	ngOnInit(){

     console.log('ajay');
    this.showMonth(); 
    

  }


}