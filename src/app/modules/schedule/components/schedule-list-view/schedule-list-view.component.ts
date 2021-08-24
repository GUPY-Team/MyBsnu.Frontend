import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'app/api/services';
import { Observable } from 'rxjs';
import { Schedule } from 'app/api/models';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-schedule-list-view',
    templateUrl: './schedule-list-view.component.html',
    styleUrls: ['./schedule-list-view.component.scss']
})
export class ScheduleListViewComponent implements OnInit {

    public loading = true;

    public displayColumns: ReadonlyArray<string> = [
        'halfYear',
        'year',
        'version',
        'isPublished',
    ];

    public scheduleList: Observable<Schedule[]>;

    constructor(
        private scheduleService: ScheduleService
    ) {
        this.scheduleList = scheduleService.getScheduleList()
            .pipe(
                tap(_ => this.loading = false)
            );
    }

    ngOnInit(): void {
    }

}
