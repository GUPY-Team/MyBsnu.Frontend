import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
    Audience,
    Class,
    ClassType,
    Course,
    EducationFormat,
    Group,
    Teacher,
    Time,
    WeekDay,
    WeekType
} from 'app/api/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassService, CourseService, EnumService } from 'app/api/services';
import { Observable, Subject } from 'rxjs';
import { FormMode, PaginationConstants } from 'app/core';
import { CreateClassCommand, UpdateClassCommand } from 'app/api/commands';
import { debounceTime, distinctUntilChanged, filter, map, share, switchMap, takeUntil, } from 'rxjs/operators';
import { DesignerAutocompleteService } from 'app/modules/schedule-designer/services';

export interface ClassDialogData {
    class?: Class,
    group?: Group,
    scheduleId: number,
}

@Component({
    selector: 'app-class-form',
    templateUrl: './class-form.component.html',
    styleUrls: ['./class-form.component.scss']
})
export class ClassFormComponent implements OnInit, OnDestroy {

    private unsubscribe = new Subject();

    public classForm!: FormGroup;
    public classPeriod!: FormGroup;
    public classInfo!: FormGroup;

    public educationFormats!: EducationFormat[];
    public classTypes!: ClassType[];
    public weekdays!: WeekDay[];
    public weekTypes!: WeekType[];

    public courses$!: Observable<Course[]>;
    public teachers$!: Observable<Teacher[]>;
    public audiences$!: Observable<Audience[]>;
    public groups$!: Observable<Group[]>;

    public formMode: FormMode = FormMode.Create;
    public actionsDisabled = false;

    public get formTitle() {
        return this.formMode === FormMode.Create ? `CLASS.FORM.CREATE_TITLE` : `CLASS.FORM.EDIT_TITLE`;
    }

    constructor(
        private dialogRef: MatDialogRef<ClassFormComponent>,
        @Inject(MAT_DIALOG_DATA) private data: ClassDialogData,
        private classService: ClassService,
        private courseService: CourseService,
        private autocompleteService: DesignerAutocompleteService,
        private enumService: EnumService,
        private formBuilder: FormBuilder
    ) {
    }

    public ngOnInit(): void {
        this.initForm();
        this.initEnums();
        this.initObservables();
        this.initEventListeners();
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public initForm(): void {
        const { class: model, group, scheduleId } = this.data;

        this.formMode = model?.id ? FormMode.Edit : FormMode.Create;

        this.classForm = this.formBuilder.group({
            id: [model?.id],
            format: [model?.format, [Validators.required]],
            type: [model?.type, [Validators.required]],
            period: this.formBuilder.group({
                weekDay: [model?.weekDay, [Validators.required]],
                weekType: [model?.weekType],
                startTime: [model?.startTime, [Validators.required]],
                endTime: [model?.endTime, [Validators.required]]
            }),
            courseId: [model?.course?.id, [Validators.required]],
            info: this.formBuilder.group({
                teachers: [model?.teachers, [Validators.required, Validators.minLength(1)]],
                audiences: [model?.audiences],
                groups: [model?.groups ?? [group], [Validators.required, Validators.minLength(1)]]
            }),
            scheduleId: [scheduleId, [Validators.required]]
        });

        this.classPeriod = this.classForm.get('period')! as FormGroup;
        this.classInfo = this.classForm.get('info')! as FormGroup;

        if (this.formMode === FormMode.Create) {
            Promise.resolve().then(_ => this.classInfo.disable());
        }
    }

    public initEnums(): void {
        this.educationFormats = this.enumService.getEducationFormats();
        this.classTypes = this.enumService.getClassTypes();
        this.weekdays = this.enumService.getStudyDays();
        this.weekTypes = this.enumService.getWeekTypes();
    }

    public initObservables(): void {
        this.courses$ = this.courseService
            .getCourses(1, PaginationConstants.extendedMaxPageSize)
            .pipe(map(list => list.items));

        const { scheduleId } = this.data;

        const periodChanges = this.classPeriod.valueChanges.pipe(
            filter(value => !!value.weekDay && !!value.startTime),
            distinctUntilChanged((a, b) =>
                a?.weekDay === b?.weekDay &&
                a?.weekType === b?.weekType &&
                a.startTime === b?.startTime
            ),
            map(value => ({ scheduleId, ...value })),
            debounceTime(1000),
            share(),
        );

        this.teachers$ = periodChanges.pipe(
            switchMap(query => this.autocompleteService.getIdleTeachers(query)),
        );
        this.audiences$ = periodChanges.pipe(
            switchMap(query => this.autocompleteService.getIdleAudiences(query)),
        );
        this.groups$ = periodChanges.pipe(
            switchMap(query => this.autocompleteService.getIdleGroups(query)),
        );
    }

    public initEventListeners(): void {
        this.classPeriod.valueChanges.pipe(
            map(value => !!value.weekDay && !!value.startTime),
            takeUntil(this.unsubscribe)
        ).subscribe(val => val
            ? this.classInfo.enable()
            : this.classInfo.disable()
        );

        if (this.formMode === FormMode.Edit) {
            Promise.resolve(null)
                .then(_ => this.classPeriod.updateValueAndValidity());
        }
    }

    public submit(): void {
        this.classForm.markAllAsTouched();

        if (!this.classForm.valid) {
            return;
        }

        const response = this.isCreateMode
            ? this.classService.createClass(this.getCommand() as CreateClassCommand)
            : this.classService.updateClass(this.getCommand() as UpdateClassCommand);

        this.actionsDisabled = true;
        response.pipe(
            takeUntil(this.unsubscribe)
        ).subscribe(
            _ => this.dialogRef.close(true),
            _ => this.actionsDisabled = false
        );
    }

    public delete(): void {
        const { class: class_ } = this.data;

        this.actionsDisabled = true;
        this.classService
            .deleteClass(class_!.id)
            .pipe(
                takeUntil(this.unsubscribe)
            ).subscribe(
            _ => this.dialogRef.close(true),
            _ => this.actionsDisabled = false
        );
    }

    public get isCreateMode() {
        return this.formMode === FormMode.Create;
    }

    public get saveDisabled() {
        return !(this.classForm.dirty && this.classForm.valid);
    }

    private getCommand(): CreateClassCommand | UpdateClassCommand {
        const command = this.classForm.value;

        const { weekDay, weekType, startTime, endTime } = command.period;
        const { teachers, audiences, groups } = command.info;

        return {
            ...command,
            weekDay,
            weekType,
            startTime: this.convertToTime(startTime),
            endTime: this.convertToTime(endTime),
            teachers: this.mapToIds(teachers),
            audiences: this.mapToIds(audiences),
            groups: this.mapToIds(groups),
            info: undefined,
            period: undefined
        };
    }

    private convertToTime(string: string): Time {
        const [hours, minutes] = string.split(':').map(s => Number(s));
        return {
            hours,
            minutes
        };
    }

    private mapToIds(array?: { id: number }[]): number[] {
        return array?.map(e => e.id) ?? [];
    }
}
