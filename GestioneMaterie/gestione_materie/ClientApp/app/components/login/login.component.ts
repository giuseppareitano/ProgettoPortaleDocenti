import { Component, OnInit, Inject, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Http, Headers } from "@angular/http";
import { Teacher } from '../teachers/teacher';




@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent  {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url: string;
    private teacher: Teacher;
    private email: string;
    private password: string;
    private home: string = '/home';
    private errorLog = false;// Settata a true in caso di dati di login errati

    constructor(

        private route: ActivatedRoute,
        private router: Router,
        private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.url = baseUrl;
    }

    login() {

        this.http.post(this.url + 'api/loginteacher', JSON.stringify({ email: this.email, password: this.password }), { headers: this.headers }).subscribe(result => {

             this.teacher = result.json() as Teacher;

             if (this.teacher) {
               
                // memorizza i dettagli dell'utente autenticato
                window.sessionStorage.setItem('currentTeacher', JSON.stringify(this.teacher));
                this.router.navigateByUrl(this.home);

            }
          
        }, error => {

            this.errorLog = true;

            });

    }

}