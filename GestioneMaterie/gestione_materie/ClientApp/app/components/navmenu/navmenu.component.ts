import { Component, OnInit } from '@angular/core';
import { Teacher } from "../teachers/teacher";
import { LoginComponent } from "../login/login.component";

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    private teacher: Teacher;
    
    
    constructor() {
        
        var currentUser = window.sessionStorage.getItem('currentTeacher');
        if (currentUser !== null) {
            this.teacher = JSON.parse(currentUser) as Teacher;
            

        }
    }


    logout() {
        // remove user from local storage to log user out
        window.sessionStorage.removeItem('currentTeacher');
      
    }

}
