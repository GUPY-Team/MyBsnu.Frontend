import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Class, Group, Schedule, ScheduleClasses, Teacher } from 'app/api/models';
import { GroupService, ScheduleService, TeacherService } from 'app/api/services';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { map, shareReplay, startWith, switchMap, takeUntil } from 'rxjs/operators';
import {
    ClassDialogComponent,
    ClassDialogData
} from 'app/modules/schedule/components/class-dialog/class-dialog.component';
import { FormControl } from '@angular/forms';

enum ViewMode {
    Group,
    Teacher
}

@Component({
    selector: 'app-schedule-designer',
    templateUrl: './schedule-designer.component.html',
    styleUrls: ['./schedule-designer.component.scss']
})
export class ScheduleDesignerComponent implements OnInit, OnDestroy {

    private unsubscribe = new Subject();

    private refresh$ = new BehaviorSubject(null);

    public viewMode = ViewMode;
    public currentViewMode: ViewMode = ViewMode.Group;

    public teachers$: Observable<Teacher[]> = of([]);
    public groups$: Observable<Group[]> = of([]);

    public teacherClasses$!: Observable<ScheduleClasses>;
    public groupClasses$!: Observable<ScheduleClasses>;

    public groupControl = new FormControl();
    public teacherControl = new FormControl();

    @Input()
    public schedule!: Schedule;

    constructor(
        private scheduleService: ScheduleService,
        private groupService: GroupService,
        private teacherService: TeacherService,
        private dialog: MatDialog
    ) {
    }

    public ngOnInit(): void {
        this.teachers$ = this.teacherService.getTeachers().pipe(shareReplay());
        this.groups$ = this.groupService.getGroups().pipe(shareReplay());

        this.groupClasses$ = combineLatest([this.refresh$, this.groupControl.valueChanges])
            .pipe(
                map(([_, group]) => group.id),
                switchMap(groupId => this.scheduleService.getGroupSchedule(this.schedule.id, groupId)),
                map(s => s.classes),
                startWith({}),
                shareReplay()
            );

        this.teacherClasses$ = combineLatest([this.refresh$, this.teacherControl.valueChanges])
            .pipe(
                map(([_, teacher]) => teacher.id),
                switchMap(teacherId => this.scheduleService.getTeacherSchedule(this.schedule.id, teacherId)),
                map(s => s.classes),
                startWith({}),
                shareReplay()
            );
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public get createClassDisabled(): boolean {
        return this.groupControl.value === null;
    }

    public changeViewMode(): void {
        this.currentViewMode = this.currentViewMode === ViewMode.Group ? ViewMode.Teacher : ViewMode.Group;
    }

    public onClassEdit(class_: Class, scheduleId: number): void {
        this.openDialog({
            group: this.groupControl.value,
            class: class_,
            scheduleId
        });
    }

    public onClassCreate(scheduleId: number): void {
        this.openDialog({
            group: this.groupControl.value,
            scheduleId
        });
    }

    private openDialog(data: ClassDialogData): void {
        const ref = this.dialog.open(ClassDialogComponent, {
            width: '1000px',
            data
        });

        ref.afterClosed().pipe(
            takeUntil(this.unsubscribe)
        ).subscribe(result => {
            if (result) {
                this.refreshClasses();
            }
        });
    }

    private refreshClasses() {
        this.refresh$.next(null);
    }
}
