import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, filter, map, share, switchMap, takeUntil, tap } from 'rxjs/operators';
import { EnumService, GroupService, ScheduleService, TeacherService } from 'app/api/services';
import { combineLatest, Observable, Subject } from 'rxjs';
import { ClassType, EducationFormat, Group, ScheduleClasses, Teacher } from 'app/api/models';
import { distinctBy, PaginationConstants } from 'app/core';
import { ScheduleFiltersService } from 'app/modules/schedule-shared/services';

@Component({
    selector: 'app-group-schedule-view',
    templateUrl: './group-schedule-view.component.html',
    styleUrls: ['./group-schedule-view.component.scss']
})
export class GroupScheduleViewComponent implements OnInit, OnDestroy {

    private unsubscribe = new Subject();

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
                tap(groups => this.initFilter(groups))
            );

        this.classTypes = this.enumService.getClassTypes();
        this.formats = this.enumService.getEducationFormats();
    }

    public ngOnInit(): void {
        this.filtersService.filter$.pipe(
            filter(filter => filter.group != null),
            distinctUntilChanged((a, b) => a.group?.id === b.group?.id),
            takeUntil(this.unsubscribe)
        ).subscribe(_ => this.filtersService.saveGroupFilter())
    }

    public ngOnDestroy(): void {
        this.filtersService.resetFilter();
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    private initFilter(groups: Group[]): void {
        const currentFilter = this.filtersService.filter;
        const savedFilter = this.filtersService.getSavedGroupFilter();

        if (savedFilter === null || !groups.some(g => g.id === savedFilter.group?.id)) {
            this.filtersService.filter = { ...currentFilter, group: groups[0] };
        } else {
            this.filtersService.filter = { ...currentFilter, ...savedFilter };
        }
    }

    private static getTeachers(classes: ScheduleClasses): Teacher[] {
        const classTeachers = Object.values(classes).flat().map(c => c.teachers).flat();
        return distinctBy(classTeachers, (t => t.id));
    }
}
