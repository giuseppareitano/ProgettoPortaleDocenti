import { Component, OnInit, Inject, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";


@Component({
    selector: 'complete-registration',
    templateUrl: './complete-registration.component.html',
    styleUrls: ['./complete-registration.component.css']
 
})

export class RegistrationCompleteComponent implements OnInit {
    
    id2: number;//Indice della posizione  del test all'interno del vettore 
    id1: number;//ID del corso

    constructor(
        private router: Router, private route: ActivatedRoute
       ) { }



    ngOnInit(): void {
        this.route.params.subscribe(params => this.id1 = params['id1']);
        this.route.params.subscribe(params => this.id2 = params['id2']);
        if (this.id2!=null)
        setTimeout(() => this.goBackStudents(this.id1, this.id2), 3000);
        if (this.id2 == null)
            setTimeout(() =>this.goBackTests(this.id1), 3000);

    }
    
    goBackStudents(id1:number, id2:number): void {

        
        console.log(this.id1);
        console.log(this.id2);
        this.router.navigate(['test-detail/', this.id1, this.id2]);



    }
    goBackTests(id1: number): void {

        this.router.navigate(['tests/', this.id1]);
    }
}