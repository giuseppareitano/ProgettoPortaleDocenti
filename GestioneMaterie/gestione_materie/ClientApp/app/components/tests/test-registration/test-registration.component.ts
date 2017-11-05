import { Component, OnInit, Inject, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Http, Headers} from "@angular/http";
import { Student } from "../../students/student";
import { Course } from '../../courses/course';
import { Registration } from '../../students/registration';
import { Prenotation } from '../../students/prenotation';
import { Test } from '../test';
import { Teacher } from "../../teachers/teacher";




@Component({
    selector: 'test-registration',
    templateUrl: './test-registration.component.html',
    styleUrls: ['./test-registration.component.css']
})

export class RegistrationTestComponent implements OnInit {
   
    students: Student[];
    id2: number;
    ngOnInit(): void {
       
        this.submitted = false;
        console.log(this.submitted);
    }
    @Input() course: Course;
    @Input() student: Student;
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private prenotation?: Prenotation;
    @Input() testDate: Date;
   
    private date: Date;
    private requiredTopics: string;
    private results = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    private result: number;
    private url: string;
    private registration: Registration;
    private test?: Test;
    private id1?: string;
    private teacher: Teacher;
    @Input() submitted: boolean;
    
   

    constructor(
        
        private route: ActivatedRoute,
        private router: Router,
        private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.url = baseUrl;
        var currentUser = window.sessionStorage.getItem('currentTeacher');
        if (currentUser !== null) {
            this.teacher = JSON.parse(currentUser) as Teacher;
            
    }

}


    registrationTest() {
        
            this.registration = new Registration(this.course.courseName, this.teacher.name +" " + this.teacher.surname, this.date, this.requiredTopics, this.result);
            this.student.registrations.push(this.registration);
            this.prenotation = this.student.prenotations.find(x => x.date === this.testDate);
        
            if (this.prenotation != null)
               this.student.prenotations.splice(this.student.prenotations.indexOf(this.prenotation), 1);

            this.test = this.course.tests.find(x => x.date === this.testDate);
            this.id1 = this.test!.bookedStudents.find(x => x == this.student.id);
            if (this.test != null && this.id1 != null ) {

               this.course.tests[this.course.tests.indexOf(this.test)].bookedStudents.splice(this.test.bookedStudents.indexOf(this.id1), 1);
             
            }
        

        this.http.post(this.url + "api/courses", JSON.stringify(this.course), { headers: this.headers }).subscribe(result => {

            console.log(result);
        }, error => { console.error(error) });

        
        this.http.post(this.url + "api/students", JSON.stringify(this.student), { headers: this.headers }).subscribe(result => {


        }, error => { console.error(error) });



        this.route.params.subscribe(params => this.id1 = params['id1']);
        this.route.params.subscribe(params => this.id2 = params['id2']);

        console.log(this.id1);
        console.log(this.id2);
       
        this.router.navigate(['complete-registration/', this.id1, this.id2] );
      


    }


}