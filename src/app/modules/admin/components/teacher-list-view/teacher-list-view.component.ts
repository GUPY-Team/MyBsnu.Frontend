import { Component } from '@angular/core';
import { Teacher } from 'app/api/models';
import { ListViewBase } from "app/modules/shared/models";
import { PagedList, Pagination } from "app/core";
import { Observable } from "rxjs";
import { TeacherService } from "app/api/services";
import { map } from "rxjs/operators";

@Component({
    selector: 'app-teacher-list-view',
    templateUrl: './teacher-list-view.component.html',
    styleUrls: ['./teacher-list-view.component.scss']
})
export class TeacherListViewComponent extends ListViewBase<Teacher> {

    public displayColumns: ReadonlyArray<string> = [
        'fullName',
        'shortName'
    ];

    constructor(
        private teacherService: TeacherService
    ) {
        super();
    }

    protected getList(pagination: Pagination): Observable<PagedList<Teacher>> {
        return this.teacherService.getTeachers().pipe(
            map(teachers => ({
                items: teachers,
                count: teachers.length,
                currentPage: 0,
                pageSize: teachers.length,
                totalCount: teachers.length,
                totalPages: 1,
                hasPreviousPage: false,
                hasNextPage: false
            }))
        );
    }

}
