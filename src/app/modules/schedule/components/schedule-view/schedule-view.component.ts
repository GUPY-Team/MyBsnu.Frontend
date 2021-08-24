import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { ScheduleFiltersService } from 'app/modules/schedule/services';
import { ScheduleService } from 'app/api/services';
import { Observable } from 'rxjs';
import { GroupSchedule } from 'app/api/models';
import { ToolbarService } from 'app/core';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule-view.component.html',
    styleUrls: ['./schedule-view.component.scss']
})
export class ScheduleViewComponent implements OnInit, OnDestroy {

    public schedule$: Observable<GroupSchedule>;

    constructor(
        private filtersService: ScheduleFiltersService,
        private scheduleService: ScheduleService,
        private toolbarService: ToolbarService
    ) {
        this.schedule$ = this.filtersService.filter$
            .pipe(
                filter(f => f.groupId !== null),
                debounceTime(750),
                tap(_ => this.toolbarService.setLoading(true)),
                switchMap(f => this.scheduleService.getGroupSchedule(f.groupId!)),
                tap(_ => this.toolbarService.setLoading(false))
            );
    }

    ngOnInit(): void {
        this.toolbarService.setLoading(true);
    }

    public ngOnDestroy(): void {
        this.toolbarService.setLoading(false);
    }
}
