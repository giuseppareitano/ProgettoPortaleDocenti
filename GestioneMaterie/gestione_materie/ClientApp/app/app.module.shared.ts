import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router, RouterModule } from '@angular/router';


import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';

import { StudentComponent } from './components/students/students.component';
import { DetailComponent } from './components/students/detail.component';
import { CoursesComponent } from './components/courses/courses.component';
import { DetailCourseComponent } from './components/courses/course-detail.component';
import { OptionCourseComponent } from './components/courses/options/course-option.component';
import { TestsComponent } from './components/tests/tests.component';
import { DetailTestComponent } from './components/tests/test-detail.component';
import { TestAddComponent } from './components/tests/test-add.component';
import { RegistrationTestComponent } from './components/tests/test-registration/test-registration.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/login/auth.guard'
import { RegistrationCompleteComponent } from "./components/tests/test-registration/complete-registration.component";
import {RefreshComponent} from './components/courses/refresh.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        StudentComponent,
        HomeComponent,
        DetailComponent,
        CoursesComponent,
        DetailCourseComponent,
        OptionCourseComponent,
        TestsComponent,
        DetailTestComponent,
        TestAddComponent,
        RegistrationTestComponent,
        LoginComponent,
        RegistrationCompleteComponent,
        RefreshComponent

    ],
    providers: [
        AuthGuard
    ],
    bootstrap: [AppComponent],

    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
 
        RouterModule.forRoot([
            { path: '', component: AppComponent, canActivate: [AuthGuard] },
            { path: 'home', component: HomeComponent},
            {
                path: 'students', component: StudentComponent
            },
            {
                path: 'courses', component: CoursesComponent
            },
          
            { path: 'detail/:id', component: DetailComponent },
            { path: 'course-detail/:id', component: DetailCourseComponent },
            { path: 'tests/:id', component: TestsComponent  },
            { path: 'test-detail/:id1/:id2', component: DetailTestComponent  },
            { path: 'test-add/:id', component: TestAddComponent },
            { path: 'login', component: LoginComponent },
            { path: 'complete-registration/:id1/:id2', component: RegistrationCompleteComponent },
            { path: 'complete-registration/:id1', component: RegistrationCompleteComponent },
            { path: 'refresh', component:RefreshComponent }
        ])
    ]
})

@NgModule({
        exports: [RouterModule]
})
export class AppModuleShared {
}
