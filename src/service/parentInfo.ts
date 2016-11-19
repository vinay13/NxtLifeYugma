import { Injectable } from '@angular/core';

@Injectable()
export class ParentInfo {
  
  constructor() {

  }

  public getStudents() {
    if (localStorage.getItem("students")) {
      let students = JSON.parse(localStorage.getItem("students"));
      return students;
    }
    return;
  }

}