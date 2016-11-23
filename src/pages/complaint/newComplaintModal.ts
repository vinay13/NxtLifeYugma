import { Component, OnInit } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';

import { ParentInfo } from '../../service/parentInfo';
import { ComplaintService } from '../../service/complaint.service';

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
  public category;
  public teachers;
  public againstEmployeeId;

  newComplaint: FormGroup;
  myForm: FormGroup;

  constructor(public viewCtrl: ViewController,
              private parentInfo: ParentInfo,
              public toastCtrl: ToastController,
              private formBuilder: FormBuilder,
              private cmplService: ComplaintService) {
    
  }

  doSomething(student) {
    console.log("student", student);
    if (student) {
      this.studentId = student.id;
      this.standardId = student.standardId;
    }
  }

  public getTeachers() {
    this.cmplService.getTeachers(this.standardId).then(teachers => {
      console.log(teachers);
      this.teachers = teachers;
    });
  }

  ngOnInit() {
    this.newComplaint = this.formBuilder.group({
      student: ['', Validators.required],
      category: ['', Validators.required],
      againstEmployeeId: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.students = this.parentInfo.getStudents();
    this.cmplService.getCategories().then(categories => {
      this.categories = categories;
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  setCategory(category) {
    if (category && category.depth === 1 && category.childCategory.length === 0) {
      this.newComplaint.addControl('againstEmployeeId', new FormControl('', [Validators.required]));
      this.getTeachers();
    } else {
      this.newComplaint.removeControl("againstEmployeeId");
      delete this.teachers;
    }
  }

  setTeacher(teacherId) {
    console.log("teacherId", teacherId)
  }

  saveComplaint(){
    if (this.newComplaint.invalid) {
      console.log("complaint invalid", this.newComplaint);
    } else {

      let newComplaint = _.extend(this.newComplaint.value, {
        againstCategoryId: this.newComplaint.value.category.id,
        studentId: this.newComplaint.value.student.id
      });

      newComplaint = _.pick(newComplaint, function(value, key, object) {
        return _.isNumber(value) || _.isString(value);
      });

      console.log("new complaint data", newComplaint)
      this.cmplService.saveComplaint(newComplaint)
        .then(res => console.log("save complaint response", res));
    }
  }

}