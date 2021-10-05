import { Component } from '@angular/core';
import { ListViewBase } from "app/modules/shared/models";
import { Audience } from "app/api/models";
import { PagedList, Pagination } from "app/core";
import { Observable } from "rxjs";
import { AudienceService } from "app/api/services";
import { map } from "rxjs/operators";

@Component({
    selector: 'app-audience-list-view',
    templateUrl: './audience-list-view.component.html',
    styleUrls: ['./audience-list-view.component.scss']
})
export class AudienceListViewComponent extends ListViewBase<Audience> {

    public displayColumns: ReadonlyArray<string> = ['fullNumber'];

    constructor(
        private audienceService: AudienceService
    ) {
        super();
    }

    protected getList(pagination: Pagination): Observable<PagedList<Audience>> {
        return this.audienceService.getAudiences().pipe(
            map(audiences => ({
                items: audiences,
                count: audiences.length,
                currentPage: 0,
                pageSize: audiences.length,
                totalCount: audiences.length,
                totalPages: 1,
                hasPreviousPage: false,
                hasNextPage: false
            }))
        );

    }

}
