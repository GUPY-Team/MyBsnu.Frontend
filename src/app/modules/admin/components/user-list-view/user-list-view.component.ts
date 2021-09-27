import { Component } from '@angular/core';
import { UserService } from 'app/modules/admin/services/user.service';
import { ListViewBase } from 'app/modules/shared/models';
import { UserListModel } from 'app/modules/admin/models';
import { PagedList, Pagination } from 'app/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-user-list-view',
    templateUrl: './user-list-view.component.html',
    styleUrls: ['./user-list-view.component.scss']
})
export class UserListViewComponent extends ListViewBase<UserListModel> {

    public displayColumns: ReadonlyArray<string> = [
        'id',
        'email',
        'userName'
    ];

    constructor(
        private userService: UserService
    ) {
        super();
    }

    protected getList(pagination: Pagination): Observable<PagedList<UserListModel>> {
        return this.userService.getUsers(pagination.page, pagination.pageSize);
    }
}
