import { Component } from '@angular/core';
import { ScheduleService } from 'app/api/services';
import { Observable } from 'rxjs';
import { Schedule } from 'app/api/models';
import { PagedList, Pagination } from 'app/core';
import { ListViewBase } from 'app/modules/shared/models';

@Component({
    selector: 'app-schedule-list-view',
    templateUrl: './schedule-list-view.component.html',
    styleUrls: ['./schedule-list-view.component.scss']
})
export class ScheduleListViewComponent extends ListViewBase<Schedule> {

    public displayColumns: ReadonlyArray<string> = [
        'semester',
        'year',
        'version',
        'isPublished',
    ];

    constructor(
        private scheduleService: ScheduleService
    ) {
        super();
    }

    protected getList(pagination: Pagination): Observable<PagedList<Schedule>> {
        return this.scheduleService.getScheduleList(pagination.page, pagination.pageSize);
    }
}
