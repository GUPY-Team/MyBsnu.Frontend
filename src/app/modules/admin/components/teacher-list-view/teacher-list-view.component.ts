import { Component } from '@angular/core';
import { Teacher } from 'app/api/models';
import { ListViewBase } from 'app/modules/shared/models';
import { PagedList, Pagination } from 'app/core';
import { Observable } from 'rxjs';
import { TeacherService } from 'app/api/services';

@Component({
    selector: 'app-teacher-list-view',
    templateUrl: './teacher-list-view.component.html',
    styleUrls: ['./teacher-list-view.component.scss']
})
export class TeacherListViewComponent extends ListViewBase<Teacher> {

    public displayColumns: ReadonlyArray<string> = [
        'id',
        'fullName',
        'shortName'
    ];

    constructor(
        private teacherService: TeacherService
    ) {
        super();
    }

    protected getList(pagination: Pagination): Observable<PagedList<Teacher>> {
        return this.teacherService.getTeachers(pagination.page, pagination.pageSize);
    }

}
