import { Component, OnInit, Inject } from '@angular/core';
import { Course } from '../courses/course';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Http } from "@angular/http";
import { Student } from "../students/student";
import { Test } from './test';
import { RegistrationTestComponent } from '../tests/test-registration/test-registration.component'; 


@Component({
    selector: 'test-detail',
    templateUrl: './test-detail.component.html',
    styleUrls: ['./test-detail.component.css']
})

export class DetailTestComponent implements OnInit {
    
    private course: Course;
    private students: Student[] = [];
    private selectedStudent: Student;
    private test: Test;
    private testDate: Date;
    private id1: number;//ID del corso
    private id2: number;//Indice del test all'interno del vettore
    private url: string;
    private i: number;
 
    constructor(

        private route: ActivatedRoute,private router: Router,
        private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.url = baseUrl;
    }

    onSelect(student: Student): void {
        this.selectedStudent = student;
        console.log("Selezionato");  
         

   
       
        
    }

    ngOnInit(): void {
        console.log("sono dentro pippo");
        this.route.params.subscribe(params => this.id1 = params['id1']);
        this.route.params.subscribe(params =>this.id2 = params['id2']);
        
        this.http.get(this.url + 'api/course?id=' + this.id1).subscribe(result => {
            this.course = result.json() as Course;
            this.test = this.course.tests[this.id2] as Test;
            console.log(this.id2);

            this.url = this.url.concat('api/coursestudents?');
            
            for (this.i = 0; this.i < this.course.tests[this.id2].bookedStudents.length; this.i++) {
                if (this.i === this.course.tests[this.id2].bookedStudents.length - 1)
                    this.url = this.url.concat('idList=' + (this.course.tests[this.id2].bookedStudents[this.i]));
                else
                    this.url = this.url.concat('idList=' + (this.course.tests[this.id2].bookedStudents[this.i]) + '&');



            }

            this.http.get(this.url).subscribe(result => {
                this.students = result.json() as Student[];
                console.log(this.students);
            }, error => { console.error(error) });





        }, error => { console.error(error) });



    }

    

       

   



}