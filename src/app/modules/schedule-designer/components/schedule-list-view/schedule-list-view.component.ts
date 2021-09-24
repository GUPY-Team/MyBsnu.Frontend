import { Component } from '@angular/core';
import { ScheduleService } from 'app/api/services';
import { BehaviorSubject, Observable } from 'rxjs';
import { Schedule } from 'app/api/models';
import { startWith, switchMap } from 'rxjs/operators';
import { EmptyPagedList, PagedList, Pagination } from 'app/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-schedule-list-view',
    templateUrl: './schedule-list-view.component.html',
    styleUrls: ['./schedule-list-view.component.scss']
})
export class ScheduleListViewComponent {

    private pagination$ = new BehaviorSubject<Pagination>({ page: 1, pageSize: 10 });

    public displayColumns: ReadonlyArray<string> = [
        'semester',
        'year',
        'version',
        'isPublished',
    ];

    public pageSizes = [5, 10, 25, 100];

    public scheduleList: Observable<PagedList<Schedule>>;

    constructor(
        private scheduleService: ScheduleService
    ) {
        this.scheduleList = this.pagination$
            .pipe(
                switchMap(p => this.scheduleService.getScheduleList(p.page, p.pageSize)),
                startWith(new EmptyPagedList())
            );
    }

    public onPaginationChange(e: PageEvent): void {
        this.pagination$.next({ page: e.pageIndex + 1, pageSize: e.pageSize });
    }
}
