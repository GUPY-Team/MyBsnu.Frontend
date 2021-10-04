import {Component} from '@angular/core';
import {Course} from 'app/api/models';
import {UpdateViewBase} from "app/modules/shared/models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {CourseService} from "app/api/services";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {tap} from "rxjs/operators";

@Component({
    selector: 'app-course-edit-view',
    templateUrl: './course-edit-view.component.html',
    styleUrls: ['./course-edit-view.component.scss']
})
export class CourseEditViewComponent extends UpdateViewBase<Course> {

    private courseId: number;

    public course$: Observable<Course>;

    public form: FormGroup = this.formBuilder.group({
        id: ['', [Validators.required]],
        name: ['', [Validators.required, Validators.maxLength(256)]],
        shortName: ['', [Validators.required, Validators.maxLength(32)]]
    });

    public onDeleteRedirect: any[] = ['admin/courses'];

    constructor(
        private courseService: CourseService,
        formBuilder: FormBuilder,
        router: Router,
        activatedRoute: ActivatedRoute,
        dialog: MatDialog
    ) {
        super(formBuilder, router, activatedRoute, dialog);

        this.courseId = Number(this.activatedRoute.snapshot.paramMap.get('id'))!;
        this.course$ = this.courseService.getCourse(this.courseId).pipe(
            tap(course => this.form.patchValue(course))
        );
    }

    public updateEntity(): Observable<Course> {
        return this.courseService.updateCourse(this.form.value);
    }

    public deleteEntity(): Observable<void> {
        return this.courseService.deleteCourse(this.courseId);
    }
}
