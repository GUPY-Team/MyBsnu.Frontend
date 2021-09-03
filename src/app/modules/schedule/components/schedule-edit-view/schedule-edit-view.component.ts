import { Component, OnDestroy } from '@angular/core';
import { GroupService, ScheduleService } from 'app/api/services';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { Group, Schedule, Class, GroupScheduleClasses } from 'app/api/models';
import { FormControl } from '@angular/forms';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import {
    ClassDialogComponent,
    ClassDialogData
} from '../class-dialog/class-dialog.component';

@Component({
    selector: 'app-schedule-edit-view',
    templateUrl: './schedule-edit-view.component.html',
    styleUrls: ['./schedule-edit-view.component.scss']
})
export class ScheduleEditViewComponent implements OnDestroy {

    private unsubsribe = new Subject();

    private refresh$ = new BehaviorSubject(null);

    public schedule$: Observable<Schedule>;
    public groups$: Observable<Group[]>;
    public classes$: Observable<GroupScheduleClasses>;

    public groupControl = new FormControl();

    constructor(
        private scheduleService: ScheduleService,
        private groupService: GroupService,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog
    ) {
        const scheduleId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

        this.schedule$ = this.scheduleService.getScheduleById(scheduleId);
        this.groups$ = this.groupService.getGroups();
        this.classes$ = combineLatest([this.refresh$, this.groupControl.valueChanges])
            .pipe(
                map(([_, groupId]) => groupId),
                switchMap(groupId => this.scheduleService.getGroupSchedule(scheduleId, groupId)),
                map(s => s.classes),
                startWith({})
            );
    }

    public ngOnDestroy(): void {
        this.unsubsribe.next();
        this.unsubsribe.complete();
    }

    public get createDisabled(): boolean {
        return this.groupControl.value === null;
    }

    public onClassEdit(class_: Class, scheduleId: number): void {
        this.openDialog({
            groupId: this.groupControl.value,
            class: class_,
            scheduleId
        });
    }

    public onClassCreate(scheduleId: number): void {
        this.openDialog({
            groupId: this.groupControl.value,
            scheduleId
        });
    }

    private openDialog(data: ClassDialogData): void {
        const ref = this.dialog.open(ClassDialogComponent, {
            width: '1000px',
            data
        });

        ref.afterClosed().pipe(
            takeUntil(this.unsubsribe)
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
