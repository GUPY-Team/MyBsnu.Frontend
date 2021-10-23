import { Component, OnDestroy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { ClassType, EducationFormat, Group, ScheduleClasses, Teacher } from 'app/api/models';
import { EnumService, GroupService, ScheduleService, TeacherService } from 'app/api/services';
import { distinctUntilChanged, filter, map, share, switchMap, tap } from 'rxjs/operators';
import { distinctBy, PaginationConstants } from 'app/core';
import { ScheduleFiltersService } from 'app/modules/schedule-shared/services';

@Component({
    selector: 'app-teacher-schedule-view',
    templateUrl: './teacher-schedule-view.component.html',
    styleUrls: ['./teacher-schedule-view.component.scss']
})
export class TeacherScheduleViewComponent implements OnDestroy {

    public classes$: Observable<ScheduleClasses>;
    public teachers$: Observable<Teacher[]>;
    public groups$: Observable<Group[]>;
    public classTypes: ClassType[];
    public formats: EducationFormat[];

    constructor(
        private filtersService: ScheduleFiltersService,
        private scheduleService: ScheduleService,
        private groupService: GroupService,
        private teacherService: TeacherService,
        private enumService: EnumService
    ) {
        const classes = this.filtersService.filter$
            .pipe(
                map(filter => filter.teacher),
                filter(teacher => teacher != null),
                distinctUntilChanged((a, b) => a?.id === b?.id),
                switchMap(teacher => this.scheduleService.getLatestTeacherSchedule(teacher!.id)),
                map(schedule => schedule.classes),
                share(),
            );

        this.classes$ = combineLatest([classes, this.filtersService.filter$])
            .pipe(
                map(([classes, filter]) => this.filtersService.applyFilter(classes, filter))
            );

        this.groups$ = classes.pipe(
            map(TeacherScheduleViewComponent.getGroups)
        );

        this.teachers$ = this.teacherService.getTeachers(1, PaginationConstants.defaultMaxPageSize)
            .pipe(
                map(list => list.items),
                tap(teachers => this.initFilter(teachers))
            );

        this.classTypes = this.enumService.getClassTypes();
        this.formats = this.enumService.getEducationFormats();
    }

    public ngOnDestroy(): void {
        this.filtersService.resetFilter();
    }

    private initFilter(teachers: Teacher[]): void {
        const currentFilter = this.filtersService.filter;
        this.filtersService.filter = { ...currentFilter, teacher: teachers[0] };
    }

    private static getGroups(classes: ScheduleClasses): Group[] {
        const classGroups = Object.values(classes).flat().map(c => c.groups).flat();
        return distinctBy(classGroups, (g => g.id));
    }
}
