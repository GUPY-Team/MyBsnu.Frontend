import { Component, OnDestroy } from '@angular/core';
import { filter, map, share, switchMap, tap } from 'rxjs/operators';
import { ScheduleFilter, ScheduleFiltersService } from 'app/modules/schedule/services';
import { EnumService, GroupService, ScheduleService, TeacherService } from 'app/api/services';
import { Observable } from 'rxjs';
import { ClassType, EducationFormat, Group, ScheduleClasses, Teacher } from 'app/api/models';
import { distinctBy } from 'app/core';

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
        this.classes$ = this.filtersService.filter$
            .pipe(
                filter(filter => filter.group != null),
                switchMap(filter => this.scheduleService.getLatestGroupSchedule(filter.group!.id)),
                map(schedule => schedule.classes),
                share(),
            );

        this.groups$ = this.groupService.getGroups()
            .pipe(
                tap(groups => this.filter = { group: groups[0] })
            );

        this.teachers$ = this.classes$.pipe(
            map(GroupScheduleViewComponent.getTeachers),
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
