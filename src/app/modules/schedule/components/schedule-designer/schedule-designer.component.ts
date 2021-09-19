import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Class, Group, Schedule, ScheduleClasses } from 'app/api/models';
import { GroupService, ScheduleService } from 'app/api/services';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import {
    ClassDialogComponent,
    ClassDialogData
} from 'app/modules/schedule/components/class-dialog/class-dialog.component';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-schedule-designer',
    templateUrl: './schedule-designer.component.html',
    styleUrls: ['./schedule-designer.component.scss']
})
export class ScheduleDesignerComponent implements OnInit, OnDestroy {

    private unsubscribe = new Subject();

    private refresh$ = new BehaviorSubject(null);

    public groups$: Observable<Group[]> = of([]);
    public classes$!: Observable<ScheduleClasses>;

    public groupControl = new FormControl();

    @Input()
    public schedule!: Schedule;

    constructor(
        private scheduleService: ScheduleService,
        private groupService: GroupService,
        private dialog: MatDialog
    ) {
    }

    public ngOnInit(): void {
        this.groups$ = this.groupService.getGroups();

        this.classes$ = combineLatest([this.refresh$, this.groupControl.valueChanges])
            .pipe(
                map(([_, group]) => group.id),
                switchMap(groupId => this.scheduleService.getGroupSchedule(this.schedule.id, groupId)),
                map(s => s.classes),
                startWith({})
            );
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public get createDisabled(): boolean {
        return this.groupControl.value === null;
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
