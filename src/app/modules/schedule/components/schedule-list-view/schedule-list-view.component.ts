import { Component } from '@angular/core';
import { ScheduleService } from 'app/api/services';
import { Observable } from 'rxjs';
import { Schedule } from 'app/api/models';

@Component({
    selector: 'app-schedule-list-view',
    templateUrl: './schedule-list-view.component.html',
    styleUrls: ['./schedule-list-view.component.scss']
})
export class ScheduleListViewComponent {

    public displayColumns: ReadonlyArray<string> = [
        'semester',
        'year',
        'version',
        'isPublished',
    ];

    public scheduleList: Observable<Schedule[]>;

    constructor(
        private scheduleService: ScheduleService
    ) {
        this.scheduleList = scheduleService.getScheduleList();
    }

}
