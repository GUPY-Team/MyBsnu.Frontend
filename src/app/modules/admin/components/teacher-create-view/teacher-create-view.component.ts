import { Component } from '@angular/core';
import { CreateViewBase } from 'app/modules/shared/models';
import { Teacher } from 'app/api/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TeacherService } from 'app/api/services';

@Component({
    selector: 'app-teacher-create-view',
    templateUrl: './teacher-create-view.component.html',
    styleUrls: ['./teacher-create-view.component.scss']
})
export class TeacherCreateViewComponent extends CreateViewBase<Teacher> {

    public form: FormGroup = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.maxLength(256)]],
        lastName: ['', [Validators.required, Validators.maxLength(256)]],
        thirdName: ['', [Validators.required, Validators.maxLength(256)]],
    });

    public onSubmitRedirect: any[] = ['/admin/teachers'];

    constructor(
        private teacherService: TeacherService,
        formBuilder: FormBuilder,
        router: Router
    ) {
        super(formBuilder, router);
    }

    public createEntity(): Observable<Teacher> {
        return this.teacherService.createTeacher(this.form.value);
    }
}
