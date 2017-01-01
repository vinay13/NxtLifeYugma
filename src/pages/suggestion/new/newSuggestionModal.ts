import { Component, OnInit } from '@angular/core';
import { ViewController, ToastController, ActionSheetController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as _ from 'underscore';

// import service
import { ParentInfo } from '../../../service/parentInfo';
import { ComplaintSuggestion } from '../../../service/cs.service';
import { CustomService } from '../../../service/customService';

import { newComplaintModal } from '../../complaint/new/newComplaintModal';

@Component({
  selector: 'new-suggestion-modal',
  templateUrl: 'newSuggestionModal.html'
})

export class newSuggestionModal extends newComplaintModal  {

  // set header title
  title: string = "New Suggestion";

  constructor(public viewCtrl: ViewController,
              public parentInfo: ParentInfo,
              public toastCtrl: ToastController,
              public formBuilder: FormBuilder,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public actionSheetCtrl: ActionSheetController) {
    super(viewCtrl, parentInfo, toastCtrl, formBuilder, nl, c, actionSheetCtrl);
  }

}
