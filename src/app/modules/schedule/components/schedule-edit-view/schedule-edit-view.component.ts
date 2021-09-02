import { Component } from '@angular/core';
import { GroupService, ScheduleService } from 'app/api/services';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Group, Schedule, Class, GroupScheduleClasses } from 'app/api/models';
import { FormControl } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs/operators';
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
export class ScheduleEditViewComponent {

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
        this.classes$ = this.groupControl.valueChanges.pipe(
            switchMap(groupId => this.scheduleService.getGroupSchedule(scheduleId, groupId)),
            map(s => s.classes),
            startWith({})
        );
    }

    public onClassEdit(class_: Class, scheduleId: number): void {
        this.dialog.open(ClassDialogComponent, {
            width: '1000px',
            data: {
                class: class_,
                scheduleId
            } as ClassDialogData
        });
    }

    public onClassCreate(scheduleId: number): void {
        this.dialog.open(ClassDialogComponent, {
            width: '1000px',
            data: {
                scheduleId
            } as ClassDialogData
        });
    }
}
