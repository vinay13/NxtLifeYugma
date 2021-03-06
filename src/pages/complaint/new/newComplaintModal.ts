import { Component, OnInit } from '@angular/core';
import { ViewController, ToastController, ActionSheetController } from 'ionic-angular';

import { ParentInfo } from '../../../service/parentInfo';
import { ComplaintService } from '../../../service/complaint.service';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import * as _ from 'underscore';

@Component({
  selector: 'new-complaint-modal',
  templateUrl: 'newComplaintModal.html'
})

export class newComplaintModal implements OnInit {

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

  newComplaint: FormGroup;
  myForm: FormGroup;

  constructor(public viewCtrl: ViewController,
              private parentInfo: ParentInfo,
              public toastCtrl: ToastController,
              private formBuilder: FormBuilder,
              private actionSheetCtrl: ActionSheetController,
              private cmplService: ComplaintService) {

  }

  selectChild(student) {
    if (student) {
      this.studentId = student.id;
      this.standardId = student.standardId;
      this.cmplService.getCategories().then(categories => {
        this.categories = categories.json();
      });
    }
  }

  public getTeachers() {
    this.cmplService.getTeachers(this.standardId).then(teachers => {
      this.teachers = teachers.json(); // Get teachers list
    });
  }

  ngOnInit() {
    this.newComplaint = this.formBuilder.group({
      student: ['', Validators.required],
      category: ['', Validators.required],
      childCategory: ['', Validators.required],
      againstEmployeeId: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]]
    });
    this.students = this.parentInfo.getStudents();
    if (this.students.length === 1) {
      this.child = this.students[0];  // Auto select for one child
    }
    let toast = this.toastCtrl.create({
      message: 'All fields are mandatory to create a new complaint',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
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

      this.newComplaint.addControl('againstEmployeeId', new FormControl('', [Validators.required]));

      if (this.newComplaint.contains("childCategory")) {
        this.newComplaint.removeControl("childCategory");
      }

      delete this.childCategories;
      this.getTeachers();
    } else if (category) {
      if (!this.newComplaint.contains("childCategory")) {
        this.newComplaint.addControl('childCategory', new FormControl('', [Validators.required]));
      }
      this.newComplaint.removeControl("againstEmployeeId");
      delete this.teachers;
      this.getChildCategory(category.id);
    }

  }

  setTeacher(teacherId) {
    console.log("teacherId", teacherId)
  }

  presentActionSheet(newComplaint) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Submit Complaint ?',
      buttons: [
        {
          text: 'Submit',
          icon: 'ios-paper-outline',
          handler: () => {
            this.cmplService.saveComplaint(newComplaint).then(complaint => {
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

  saveComplaint(){

    if (this.newComplaint.invalid) {
      console.log("Complaint invalid")
    } else {

      let newComplaint = _.extend(this.newComplaint.value, {
        againstCategoryId: this.newComplaint.value.category.id,
        studentId: this.newComplaint.value.student.id
      });

      newComplaint = _.pick(newComplaint, function(value, key, object) {
        return _.isNumber(value) || _.isString(value);
      });

      if (newComplaint.childCategory) {
        newComplaint.againstCategoryId = newComplaint.childCategory;
        delete newComplaint.childCategory;
      }
      this.presentActionSheet(newComplaint);

    }
  }

}
