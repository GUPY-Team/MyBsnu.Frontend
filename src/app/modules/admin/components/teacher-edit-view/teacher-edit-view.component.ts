import { Component } from '@angular/core';
import { UpdateViewBase } from 'app/modules/shared/models';
import { Teacher } from 'app/api/models';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from 'app/api/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-teacher-edit-view',
    templateUrl: './teacher-edit-view.component.html',
    styleUrls: ['./teacher-edit-view.component.scss']
})
export class TeacherEditViewComponent extends UpdateViewBase<Teacher> {

    private readonly teacherId: number;

    public form: FormGroup = this.formBuilder.group({
        id: ['', [Validators.required]],
        firstName: ['', [Validators.required, Validators.maxLength(256)]],
        lastName: ['', [Validators.required, Validators.maxLength(256)]],
        thirdName: ['', [Validators.required, Validators.maxLength(256)]],

    });

    public onDeleteRedirect: any[] = ['/admin/teachers'];

    constructor(
        private teacherService: TeacherService,
        formBuilder: FormBuilder,
        router: Router,
        activatedRoute: ActivatedRoute,
        dialog: MatDialog
    ) {
        super(formBuilder, router, activatedRoute, dialog);

        this.teacherId = Number(this.activatedRoute.snapshot.paramMap.get('id'))!;
    }

    public getEntity(): Observable<Teacher> {
        return this.teacherService.getTeacher(this.teacherId);
    }

    public updateEntity(): Observable<Teacher> {
        return this.teacherService.updateTeacher(this.form.value);
    }

    public deleteEntity(): Observable<void> {
        return this.teacherService.deleteTeacher(this.teacherId);
    }
}
