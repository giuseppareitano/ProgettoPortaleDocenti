import { Component, OnInit, Inject } from '@angular/core';
import { Course } from './course';

import { Router, ActivatedRoute } from '@angular/router';
import { Http } from "@angular/http";
import { OptionCourseComponent } from '../courses/options/course-option.component';
import { Teacher } from "../teachers/teacher";
@Component({
    selector: 'courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
    teacher: Teacher;
    idCourseDelete: number;
    courses: Course[];
    selectedCourse: Course;
    private url: string;
 
    onSelect(course: Course): void {
        this.selectedCourse = course;

    }

    constructor(private router: Router, private http: Http, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute) {

        this.url = baseUrl;
        var currentUser = window.sessionStorage.getItem('currentTeacher');
        if (currentUser !== null) {
            this.teacher = JSON.parse(currentUser) as Teacher;
            console.log(this.teacher);
        }
        //Richiedo tutti i corsi del docente autenticato
            http.get(baseUrl + 'api/login/courses?teacher=' + this.teacher.name + " " + this.teacher.surname).subscribe(result => {
            this.courses = result.json();
           
        }, error => console.error(error));
    }
    /* Funzione utilizzata per eliminare un corso che rimanda al component Refresh che a sua volta rimanda al component courses*/
    deleteCourse(idCourse: number) {
        this.idCourseDelete === idCourse;
        this.http.delete(this.url + 'api/course?id=' + idCourse).subscribe(result => {

            this.router.navigate(['refresh']);
        }, error => console.error(error));


    }
   
}