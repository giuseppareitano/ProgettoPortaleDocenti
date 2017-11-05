import { Component, OnInit, Inject, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";


@Component({
    selector: 'refresh',
    templateUrl: './refresh.component.html'

})

export class RefreshComponent implements OnInit {

    // Permette di effettuare il refresh dei corsi dopo l'eliminazione

    constructor(
        private router: Router, private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.router.navigate(['courses/']);


    }

}