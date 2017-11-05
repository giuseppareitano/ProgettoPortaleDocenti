import { Component, OnInit, Inject } from '@angular/core';
import { Teacher } from '../teachers/teacher';
import { HomeComponent } from '../home/home.component';
import { Router } from '@angular/router';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
    private visibiltyNavbar: boolean; // utilizzata per nascondere la navbar in fase di login

    constructor(private router: Router) { }

    ngOnInit(): void {

        this.router.events.subscribe(() => {
            console.log("faccio la onint");
            if (typeof window !== "undefined") {

                if (window.sessionStorage.getItem('currentTeacher')) {
                    console.log("sono dentro home current teacher!")
                    this.visibiltyNavbar = true;

                }
                else {
                    this.visibiltyNavbar = false;

                }
            }

        });
    }
}




