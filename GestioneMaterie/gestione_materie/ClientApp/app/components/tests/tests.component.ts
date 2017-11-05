import { Component, OnInit, Inject } from '@angular/core';
import { Test } from './test';

import { Router, ActivatedRoute } from '@angular/router';
import { Http } from "@angular/http";
import { Course } from "../courses/course";

@Component({
    selector: 'tests',
    templateUrl: './tests.component.html',
    styleUrls:['./tests.component.css']
})
export class TestsComponent implements OnInit {
    private tests: Test[];
    private course: Course;
    private url: string;
    private id: number;//ID del corso

    
    constructor(

        private route: ActivatedRoute,
        private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.url = baseUrl;
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => this.id = params['id']);
        this.http.get(this.url + 'api/course?id=' + this.id).subscribe(result => {
            this.course = result.json() as Course;
            this.tests = this.course.tests;




        }, error => { console.error(error) });

    }


 
    

}

