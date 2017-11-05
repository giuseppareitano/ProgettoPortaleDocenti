import { Component, OnInit, Inject, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Http } from "@angular/http";
import { Course } from "../../courses/course";

@Component({
    selector: 'course-option',
    templateUrl: './course-option.component.html',
    styleUrls: ['./course-option.component.css']
})

export class OptionCourseComponent {
     @Input() course: Course;



}
