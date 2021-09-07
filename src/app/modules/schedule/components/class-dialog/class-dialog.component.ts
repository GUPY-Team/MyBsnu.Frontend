import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
    Audience,
    ClassType,
    EducationFormat,
    Teacher,
    WeekDay,
    Class,
    Course,
    Group,
    Time,
    WeekType
} from 'app/api/models';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {
    AudienceService,
    ClassService,
    EnumService, GroupService,
    TeacherService,
} from 'app/api/services';
import { Observable, Subject } from 'rxjs';
import { getErrorMessages } from 'app/core';
import { FormMode } from 'app/core/models/formMode';
import { CourseService } from 'app/api/services/course.service';
import { CreateClassCommand, UpdateClassCommand } from 'app/api/commands';
import { shareReplay, takeUntil } from 'rxjs/operators';

export interface ClassDialogData {
    class?: Class,
    group?: Group,
    scheduleId: number,
}

@Component({
    selector: 'app-class-dialog',
    templateUrl: './class-dialog.component.html',
    styleUrls: ['./class-dialog.component.scss']
})
export class ClassDialogComponent implements OnInit, OnDestroy {

    private unsubscribe = new Subject();

    public classForm!: FormGroup;

    public educationFormats: EducationFormat[];
    public classTypes: ClassType[];
    public weekdays: WeekDay[];
    public weekTypes: WeekType[];

    public teachers$: Observable<Teacher[]>;
    public audiences$: Observable<Audience[]>;
    public courses$: Observable<Course[]>;
    public groups$: Observable<Group[]>;

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
        private enumService: EnumService,
        private classService: ClassService,
        private courseService: CourseService,
        private teacherService: TeacherService,
        private audienceService: AudienceService,
        private groupService: GroupService
    ) {
        this.educationFormats = this.enumService.getEducationFormats();
        this.classTypes = this.enumService.getClassTypes();
        this.weekdays = this.enumService.getStudyDays();
        this.weekTypes = this.enumService.getWeekTypes();

        this.teachers$ = this.teacherService.getTeachers().pipe(shareReplay());
        this.audiences$ = this.audienceService.getAudiences().pipe(shareReplay());
        this.courses$ = this.courseService.getCourses();
        this.groups$ = this.groupService.getGroups().pipe(shareReplay());
    }

    public ngOnInit(): void {
        this.initForm();
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public submit(): void {
        this.classForm.markAllAsTouched();

        if (!this.classForm.valid) {
            return;
        }

        const response = this.isCreateMode
            ? this.classService.createClass(this.getCommand() as CreateClassCommand)
            : this.classService.updateClass(this.getCommand() as UpdateClassCommand);

        response.pipe(
            takeUntil(this.unsubscribe)
        ).subscribe(_ => this.dialogRef.close(true));
    }

    public delete(): void {
        const { class: class_ } = this.data;

        this.classService
            .deleteClass(class_!.id)
            .pipe(
                takeUntil(this.unsubscribe)
            ).subscribe(_ => this.dialogRef.close(true));
    }

    public get isCreateMode() {
        return this.formMode === FormMode.Create;
    }

    public get saveDisabled() {
        return !(this.classForm.dirty && this.classForm.valid);
    }

    public filterTeachers(teachers: Teacher[], value: string): Teacher[] {
        return teachers.filter(t => t.fullName.includes(value));
    }

    public displayTeacher(teacher: Teacher): string {
        return teacher.fullName;
    }

    public filterAudiences(audiences: Audience[], value: string): Audience[] {
        return audiences.filter(a => a.fullNumber.includes(value));
    }

    public displayAudience(audience: Audience): string {
        return audience.fullNumber;
    }

    public filterGroups(groups: Group[], value: string): Group[] {
        return groups.filter(a => a.number.includes(value));
    }

    public displayGroup(group: Group): string {
        return group.number;
    }

    private initForm(): void {
        const { class: class_, group, scheduleId } = this.data;

        this.formMode = class_?.id ? FormMode.Edit : FormMode.Create;
        this.classForm = this.formBuilder.group({
            id: [class_?.id],
            format: [class_?.format, [Validators.required]],
            type: [class_?.type, [Validators.required]],
            weekDay: [class_?.weekDay, [Validators.required]],
            weekType: [class_?.weekType],
            startTime: [class_?.startTime, [Validators.required]],
            endTime: [class_?.endTime, [Validators.required]],
            teachers: [class_?.teachers, [Validators.required]],
            audiences: [class_?.audiences],
            groups: [class_?.groups ?? [group], Validators.required],
            scheduleId: [scheduleId, [Validators.required]],
            courseId: [class_?.courseId, [Validators.required]]
        });
    }

    private getCommand(): CreateClassCommand | UpdateClassCommand {
        const command = this.classForm.value;

        return {
            ...command,
            startTime: this.convertToTime(command.startTime),
            endTime: this.convertToTime(command.endTime),
            teachers: command.teachers.map((t: Teacher) => t.id),
            audiences: command.audiences?.map((a: Audience) => a.id) ?? [],
            groups: command.groups.map((g: Group) => g.id)
        };
    }

    private convertToTime(string: string): Time {
        const [hours, minutes] = string.split(':').map(s => Number(s));
        return {
            hours,
            minutes
        };
    }
}
