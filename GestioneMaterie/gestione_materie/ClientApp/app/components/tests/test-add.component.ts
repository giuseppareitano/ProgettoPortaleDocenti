import { Component, OnInit, Inject } from '@angular/core';
import { Course } from '../courses/course';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Http, Headers  } from "@angular/http";
import { Student } from "../students/student";
import { Test } from './test'



@Component({
    selector: 'test-add',
    templateUrl: './test-add.component.html',

})

export class TestAddComponent implements OnInit {
    private course: Course;
    private students: Student[] = [];
    private descriptions = ['Scritto', 'Orale', 'Progetto', 'Prova in itinere'];
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private id: number;// ID del corso
    private url: string;
    private test: Test;
    private classroom: string;
    private date: Date;
    private description: string;
    private bookedStudent: string[] = [];
 
    constructor(

        private route: ActivatedRoute,private router:Router,
        private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.url = baseUrl;
    }


    ngOnInit(): void {
       
        this.route.params.subscribe(params => this.id = params['id']);

        this.http.get(this.url + 'api/course?id=' + this.id).subscribe(result => {
            this.course = result.json() as Course;
        }, error => { console.error(error) });
    }

    saveTest() {
        
        this.test = new Test(this.date, this.classroom, this.description, this.bookedStudent);
        this.course.tests.push(this.test);
        
        this.http.post(this.url + "api/courses", JSON.stringify(this.course), { headers: this.headers }).subscribe(result => {

            
            this.router.navigate(['complete-registration/', this.id]);

        }, error => { console.error(error) });
    }

    



}