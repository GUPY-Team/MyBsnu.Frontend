import { Component } from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { ScheduleFiltersService } from 'app/modules/schedule/services';
import { ScheduleService } from 'app/api/services';
import { Observable } from 'rxjs';
import { GroupScheduleClasses } from 'app/api/models';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule-view.component.html',
    styleUrls: ['./schedule-view.component.scss']
})
export class ScheduleViewComponent {

    public classes$: Observable<GroupScheduleClasses>;

    constructor(
        private filtersService: ScheduleFiltersService,
        private scheduleService: ScheduleService
    ) {
        this.classes$ = this.filtersService.filter$
            .pipe(
                filter(f => f.groupId !== null),
                switchMap(f => this.scheduleService.getLatestGroupSchedule(f.groupId!)),
                map(s => s.classes),
            );
    }
}
