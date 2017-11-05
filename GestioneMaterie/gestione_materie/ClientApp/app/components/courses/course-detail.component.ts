import { Component, OnInit, Inject } from '@angular/core';
import { Course } from './course';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Http } from "@angular/http";
import { Student } from "../students/student"


@Component({
    selector: 'course-detail',
    templateUrl: './course-detail.component.html',
    styleUrls:['./course-detail.component.css']
})

export class DetailCourseComponent implements OnInit {
    private course: Course;
    private students: Student[]= [];
    private id: number;//id del corso selezionato
    private url: string;
    private i: number;
   
    constructor(

        private route: ActivatedRoute,
        private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.url=baseUrl;
    }

    ngOnInit(): void {

        this.route.params.subscribe(params => this.id = params['id']);
         
        this.http.get(this.url + 'api/course?id=' + this.id).subscribe(result => {
            this.course = result.json() as Course;
           /*Creo l'url concatenando gli ID degli studenti scritti */
             this.url = this.url.concat('api/coursestudents?');
            for (this.i = 0; this.i < this.course.enrolledStudents.length; this.i++) {
                if (this.i === this.course.enrolledStudents.length - 1)
                    this.url = this.url.concat('idList=' + (this.course.enrolledStudents[this.i]));
                else
                this.url = this.url.concat('idList=' + (this.course.enrolledStudents[this.i]) + '&');
            }
            
            this.http.get(this.url).subscribe(result => {
                this.students = result.json() as Student[];
                
            }, error => { console.error(error) });
            
        }, error => { console.error(error) });   
    }        
}