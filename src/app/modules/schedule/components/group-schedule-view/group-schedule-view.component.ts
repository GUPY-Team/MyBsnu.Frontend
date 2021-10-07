import { Component, OnDestroy } from '@angular/core';
import { distinctUntilChanged, filter, map, share, switchMap, tap } from 'rxjs/operators';
import { EnumService, GroupService, ScheduleService, TeacherService } from 'app/api/services';
import { combineLatest, Observable } from 'rxjs';
import { ClassType, EducationFormat, Group, ScheduleClasses, Teacher } from 'app/api/models';
import { distinctBy, PaginationConstants } from 'app/core';
import { ScheduleFilter, ScheduleFiltersService } from 'app/modules/schedule-shared/services';

@Component({
    selector: 'app-group-schedule-view',
    templateUrl: './group-schedule-view.component.html',
    styleUrls: ['./group-schedule-view.component.scss']
})
export class GroupScheduleViewComponent implements OnDestroy {

    public classes$: Observable<ScheduleClasses>;
    public teachers$: Observable<Teacher[]>;
    public groups$: Observable<Group[]>;
    public classTypes: ClassType[];
    public formats: EducationFormat[];

    public filter: ScheduleFilter | null = null;

    constructor(
        private filtersService: ScheduleFiltersService,
        private scheduleService: ScheduleService,
        private groupService: GroupService,
        private teacherService: TeacherService,
        private enumService: EnumService
    ) {
        const classes = this.filtersService.filter$
            .pipe(
                map(filter => filter.group),
                filter(group => group != null),
                distinctUntilChanged((a, b) => a?.id === b?.id),
                switchMap(group => this.scheduleService.getLatestGroupSchedule(group!.id)),
                map(schedule => schedule.classes),
                share(),
            );

        this.classes$ = combineLatest([classes, this.filtersService.filter$])
            .pipe(
                map(([classes, filter]) => this.filtersService.applyFilter(classes, filter))
            );

        this.teachers$ = classes.pipe(
            map(GroupScheduleViewComponent.getTeachers),
        );

        this.groups$ = this.groupService.getGroups(1, PaginationConstants.defaultMaxPageSize)
            .pipe(
                map(list => list.items),
                tap(groups => this.filter = { group: groups[0] })
            );

        this.classTypes = this.enumService.getClassTypes();
        this.formats = this.enumService.getEducationFormats();
    }

    public ngOnDestroy(): void {
        this.filtersService.resetFilter();
    }

    private static getTeachers(classes: ScheduleClasses): Teacher[] {
        const classTeachers = Object.values(classes).flat().map(c => c.teachers).flat();
        return distinctBy(classTeachers, (t => t.id));
    }
}
