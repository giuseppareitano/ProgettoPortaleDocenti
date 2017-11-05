import { Component, OnInit, Inject } from '@angular/core';
import { Student } from './student';

import { Router } from '@angular/router';
import { Http } from "@angular/http";

@Component({
    selector: 'students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.css']
})
export class StudentComponent  {
    
    
   
    router: Router;
    students: Student[];
    selectedStudent: Student;

    onSelect(student: Student): void {
        this.selectedStudent = student;
       
    }

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/students').subscribe(result => {
            this.students = result.json() as Student[];
            this.students.forEach
            console.log(result);
        }, error => console.error(error));
    }
    

}