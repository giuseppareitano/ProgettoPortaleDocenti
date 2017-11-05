import { Component, OnInit, Inject } from '@angular/core';
import { Student } from './student';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Http } from "@angular/http";


@Component({
    selector: 'detail',
    templateUrl: './detail.component.html',
    styleUrls:['./detail.component.css']
})

export class DetailComponent implements OnInit {
    student: Student;
    id: number;// Id dello studente
    
    ngOnInit(): void {
        this.student
    }
    constructor(
       private route: ActivatedRoute,
       private http: Http, @Inject('BASE_URL') baseUrl: string) {
       
        this.route.params.subscribe(params => this.id = params['id']);

        http.get(baseUrl + 'api/student?id=' + this.id).subscribe(result => {
            this.student = result.json() as Student;
        }, error => console.error(error));

    }


   
}