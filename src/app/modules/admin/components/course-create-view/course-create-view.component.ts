import {Component} from '@angular/core';
import {Course} from "app/api/models";
import {CreateViewBase} from 'app/modules/shared/models';
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "app/api/services";
import {Router} from "@angular/router";

@Component({
    selector: 'app-course-create-view',
    templateUrl: './course-create-view.component.html',
    styleUrls: ['./course-create-view.component.scss']
})
export class CourseCreateViewComponent extends CreateViewBase<Course> {

    form: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(255)]],
        shortName: ['', [Validators.required, Validators.maxLength(32)]]
    });

    onSubmitRedirect: any[] = ['admin/courses'];

    constructor(
        private courseService: CourseService,
        formBuilder: FormBuilder,
        router: Router
    ) {
        super(formBuilder, router);
    }

    public createEntity(): Observable<Course> {
        return this.courseService.createCourse(this.form.value);
    }
}
