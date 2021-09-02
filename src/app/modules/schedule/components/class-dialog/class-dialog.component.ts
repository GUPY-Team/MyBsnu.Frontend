import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Audience, ClassType, EducationFormat, Teacher, WeekDay, Class } from 'app/api/models';
import {
    FormBuilder, FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import {
    AudienceService,
    ClassTypeService,
    EducationFormatService,
    TeacherService,
    WeekdayService
} from 'app/api/services';
import { Observable } from 'rxjs';
import { getErrorMessages } from 'app/core';
import { FormMode } from 'app/core/models/formMode';

export interface ClassDialogData {
    class?: Class,
    scheduleId: number
}

@Component({
    selector: 'app-class-dialog',
    templateUrl: './class-dialog.component.html',
    styleUrls: ['./class-dialog.component.scss']
})
export class ClassDialogComponent implements OnInit {

    public teacherControl!: FormControl;
    public audienceControl!: FormControl;

    public classForm!: FormGroup;

    public educationFormats: EducationFormat[];
    public classTypes: ClassType[];
    public weekdays: WeekDay[];

    public teachers$: Observable<Teacher[]>;
    public audiences$: Observable<Audience[]>;

    public formMode: FormMode = FormMode.Create;

    public get errors() {
        return getErrorMessages(this.classForm);
    }

    public get formTitle() {
        return this.formMode === FormMode.Create ? `Create class` : `Edit class`;
    }

    constructor(
        private dialogRef: MatDialogRef<ClassDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: ClassDialogData,
        private formBuilder: FormBuilder,
        private educationFormatService: EducationFormatService,
        private classTypeService: ClassTypeService,
        private weekdayService: WeekdayService,
        private teacherService: TeacherService,
        private audienceService: AudienceService,
    ) {
        this.educationFormats = this.educationFormatService.getEducationFormats();
        this.classTypes = this.classTypeService.getClassTypes();
        this.weekdays = this.weekdayService.getStudyDays();

        this.teachers$ = this.teacherService.getTeachers();
        this.audiences$ = this.audienceService.getAudiences();
    }

    public ngOnInit(): void {
        this.initForm();
    }

    public get isCreateMode() {
        return this.formMode === FormMode.Create;
    }

    public get saveDisabled() {
        return !(this.classForm.dirty && this.classForm.valid);
    }

    private initForm(): void {
        const { class: class_, scheduleId } = this.data;

        this.formMode = class_?.id ? FormMode.Edit : FormMode.Create;

        this.classForm = this.formBuilder.group({
            id: [class_?.id],
            format: [class_?.format, [Validators.required]],
            type: [class_?.type, [Validators.required]],
            weekDay: [class_?.weekDay, [Validators.required]],
            startTime: [class_?.startTime, [Validators.required]],
            endTime: [class_?.endTime, [Validators.required]],
            teachers: [class_?.teachers, [Validators.required]],
            audiences: [class_?.audiences],
            scheduleId: [scheduleId, [Validators.required]],
        });

        this.teacherControl = this.classForm.controls['teachers'] as FormControl;
        this.audienceControl = this.classForm.controls['audiences'] as FormControl;
    }
}
