import { Component } from '@angular/core';
import { ListViewBase } from 'app/modules/shared/models';
import { Group } from 'app/api/models';
import { PagedList, Pagination } from 'app/core';
import { Observable } from 'rxjs';
import { GroupService } from 'app/api/services';

@Component({
    selector: 'app-group-list-view',
    templateUrl: './group-list-view.component.html',
    styleUrls: ['./group-list-view.component.scss']
})
export class GroupListViewComponent extends ListViewBase<Group> {

    public displayColumns: ReadonlyArray<string> = [
        'id',
        'number'
    ];

    constructor(
        private groupService: GroupService
    ) {
        super();
    }

    protected getList(pagination: Pagination): Observable<PagedList<Group>> {
        return this.groupService.getGroups(pagination.page, pagination.pageSize);
    }

}
