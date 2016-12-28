import { Component, OnInit } from '@angular/core';
import { ViewController, ToastController, ActionSheetController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as _ from 'underscore';

// import service
import { ParentInfo } from '../../../service/parentInfo';
import { ComplaintSuggestion } from '../../../service/cs.service';
import { CustomService } from '../../../service/customService';

@Component({
  selector: 'new-suggestion-modal',
  templateUrl: 'newSuggestionModal.html'
})

export class newSuggestionModal implements OnInit {

  // set header title
  title: string = "New Suggestion";

  public students;
  public student;
  public standardId;
  public studentId;
  public categories;
  public childCategories;
  public category;
  public teachers;
  public againstEmployeeId;
  public childCategory;
  public child;
  public description = [];

  newSuggestion: FormGroup;
  myForm: FormGroup;

  constructor(public viewCtrl: ViewController,
              private parentInfo: ParentInfo,
              public toastCtrl: ToastController,
              private formBuilder: FormBuilder,
              private nl: CustomService,
              private c: ComplaintSuggestion,
              private actionSheetCtrl: ActionSheetController) {

  }

  selectChild(student) {
    if (student) {
      this.studentId = student.id;
      this.standardId = student.standardId;
    }
  }

  public getTeachers() {
    this.c.getTeachers(this.standardId).subscribe((teachers) => {
      this.teachers = teachers.json(); // Get teachers list
    });
  }

  ngOnInit() {
    this.loadForm();
    this.students = this.parentInfo.getStudents();
    if (this.students.length === 1) {
      this.child = this.students[0];  // Auto select for one child
    }
    this.nl.showToast("All fields are mandatory to create a new complaint");
  }

  loadForm() {
    this.newSuggestion = this.formBuilder.group({
      student: ['', Validators.required],
      category: ['', Validators.required],
      childCategory: ['', Validators.required],
      againstEmployeeId: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  ionViewWillEnter() {
    this.nl.showLoader();
    this.c.getCategories().subscribe((categories) => {
      this.nl.hideLoader();
      this.categories = categories.json();
    }, (err) => {
      this.nl.hideLoader();
      this.nl.errMessage();
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  public getChildCategory(categoryId) {
    for(let subCategory of this.categories) {
      if (subCategory.id === categoryId) {
        this.childCategories = subCategory.childCategory;
      }
    }
  }

  setCategory(category) {

    if (category && category.depth === 1 && category.childCategory.length === 0) {

      this.newSuggestion.addControl('againstEmployeeId', new FormControl('', [Validators.required]));

      if (this.newSuggestion.contains("childCategory")) {
        this.newSuggestion.removeControl("childCategory");
      }

      delete this.childCategories;
      this.getTeachers();
    } else if (category) {
      if (!this.newSuggestion.contains("childCategory")) {
        this.newSuggestion.addControl('childCategory', new FormControl('', [Validators.required]));
      }
      this.newSuggestion.removeControl("againstEmployeeId");
      delete this.teachers;
      this.getChildCategory(category.id);
    }

  }

  setTeacher(teacherId) {
    console.log("teacherId", teacherId)
  }

  presentActionSheet(newSuggestion) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Submit Complaint ?',
      buttons: [
        {
          text: 'Submit',
          icon: 'ios-paper-outline',
          handler: () => {
            this.c.saveComplaint(newSuggestion).subscribe((complaint) => {
              this.viewCtrl.dismiss(complaint.json());
            });
          }
        },{
          text: 'Cancel',
          icon: 'md-close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  saveSuggestion(){

    if (this.newSuggestion.invalid) {
      console.log("Complaint invalid")
    } else {

      let newSuggestion = _.extend(this.newSuggestion.value, {
        againstCategoryId: this.newSuggestion.value.category.id,
        studentId: this.newSuggestion.value.student.id
      });

      newSuggestion = _.pick(newSuggestion, function(value, key, object) {
        return _.isNumber(value) || _.isString(value);
      });

      if (newSuggestion.childCategory) {
        newSuggestion.againstCategoryId = newSuggestion.childCategory;
        delete newSuggestion.childCategory;
      }
      this.presentActionSheet(newSuggestion);

    }
  }

}
