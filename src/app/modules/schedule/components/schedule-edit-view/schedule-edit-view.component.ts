import { Component, OnDestroy } from '@angular/core';
import { GroupService, ScheduleService } from 'app/api/services';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { Group, Schedule, Class, ScheduleClasses } from 'app/api/models';
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

    private unsubscribe = new Subject();

    private refresh$ = new BehaviorSubject(null);

    public schedule$: Observable<Schedule>;
    public groups$: Observable<Group[]>;
    public classes$: Observable<ScheduleClasses>;

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
                map(([_, group]) => group.id),
                switchMap(groupId => this.scheduleService.getGroupSchedule(scheduleId, groupId)),
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
