import { Component } from '@angular/core';
import { ModalController,
         AlertController,
         PopoverController,
         ActionSheetController,
         Events } from 'ionic-angular';

// import service
import { CustomService } from '../../service/customService';
import { ComplaintSuggestion } from '../../service/cs.service';

// import modal
import { newSuggestionModal } from './new/newSuggestionModal';

// import Component
import { ComplaintPage } from '../complaint/complaint';

@Component({
  selector: 'page-map',
  templateUrl: 'suggestion.html'
})

export class SuggestionPage extends ComplaintPage {

  // set header title
  title: string = "Suggestions";

  // used in event
  public master: string = "suggestion";

  // current page
  public currentPage: number = 1;

  // for no suggestion
  EmptySuggestion: boolean = false;

  // all Suggestions
  suggestions = [];

  constructor(public nl: CustomService,
              public events: Events,
              public alertCtrl: AlertController,
              public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController,
              public c: ComplaintSuggestion) {
    super(modalCtrl, alertCtrl, events, nl, c, actionSheetCtrl);
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getSuggestions();
  }

  getSuggestions() {
    this.getComplaints();
  }

  // Respond after Angular projects external content into the component's view.
  // Called once after the first NgDoCheck
  ngAfterContentInit() {
    this.events.subscribe('suggestion:comment', (data) => {
      this.openCommentModal(data[0]);
    });
    this.events.subscribe('suggestion:close', (data) => {
      this.openCloseModal(data[0]);
    });
    this.events.subscribe('suggestion:reopen', (data) => {
      this.openReopenModal(data[0]);
    });
    this.events.subscribe('suggestion:satisfied', (data) => {
      this.openSatisfiedModal(data[0]);
    });
  }

  loadMoreSuggestions(infiniteScroll) {
    this.currentPage += 1;
    setTimeout(() => {
      this.c.getComplaints(this.currentPage).subscribe(response => {
        if (response.status === 204) { return; }
        for (var i = 0; i < response.json().length; i++) {
          this.suggestions.push(response.json()[i]);
        }
      });
      infiniteScroll.complete();
    }, 1000);
  }

  loadNewSuggestions(refresher) {
    this.loadNewComplaints(refresher);
  }

  openCommentModal(suggestion) {

  }

  openCloseModal(suggestion) {

  }

  openReopenModal(suggestion) {

  }

  openSatisfiedModal(suggestion) {

  }

  newSuggestion() {
    let suggestionModal = this.modalCtrl.create(newSuggestionModal);
    suggestionModal.onDidDismiss((newSuggestion) => {
      if (!newSuggestion) { return; }
      if (this.suggestions.length != 0) {
        this.EmptySuggestion = false;
        this.suggestions.unshift(newSuggestion);
      } else {
        this.EmptySuggestion = false;
        this.suggestions.push(newSuggestion);
      }
    });
    suggestionModal.present();
  }

  viewSuggestion(suggestion) {

  }

}
