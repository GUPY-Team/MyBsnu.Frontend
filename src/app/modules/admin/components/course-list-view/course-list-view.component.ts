import { Component } from '@angular/core';
import { ListViewBase } from 'app/modules/shared/models';
import { Course } from 'app/api/models';
import { Observable } from 'rxjs';
import { PagedList, Pagination } from 'app/core';
import { CourseService } from 'app/api/services';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-course-list-view',
    templateUrl: './course-list-view.component.html',
    styleUrls: ['./course-list-view.component.scss']
})
export class CourseListViewComponent extends ListViewBase<Course> {

    displayColumns: ReadonlyArray<string> = [
        'id',
        'name',
        'shortName'
    ];

    constructor(
        private courseService: CourseService
    ) {
        super();
    }

    protected getList(pagination: Pagination): Observable<PagedList<Course>> {
        return this.courseService.getCourses().pipe(
            map(courses => ({
                items: courses,
                count: courses.length,
                currentPage: 0,
                pageSize: courses.length,
                totalCount: courses.length,
                totalPages: 1.,
                hasPreviousPage: false,
                hasNextPage: false
            }))
        );
    }


}
