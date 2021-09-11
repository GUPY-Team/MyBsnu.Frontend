import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassType, EducationFormat, Group, ScheduleClasses, Teacher } from 'app/api/models';
import { EnumService, GroupService, ScheduleService, TeacherService } from 'app/api/services';
import { ScheduleFilter, ScheduleFiltersService } from 'app/modules/schedule/services';
import { filter, map, share, switchMap, tap } from 'rxjs/operators';
import { distinctBy } from 'app/core';

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
                filter(filter => filter.teacher != null),
                switchMap(filter => this.scheduleService.getLatestTeacherSchedule(filter.teacher!.id)),
                map(schedule => schedule.classes),
                share(),
            );

        this.groups$ = this.classes$.pipe(
            map(TeacherScheduleViewComponent.getGroups)
        );

        this.teachers$ = this.teacherService.getTeachers()
            .pipe(
                tap(teachers => this.filter = { teacher: teachers[0] })
            );

        this.classTypes = this.enumService.getClassTypes();
        this.formats = this.enumService.getEducationFormats();
    }

    public ngOnDestroy(): void {
        this.filtersService.resetFilter();
    }

    private static getGroups(classes: ScheduleClasses): Group[] {
        const classGroups = Object.values(classes).flat().map(c => c.groups).flat();
        return distinctBy(classGroups, (g => g.id));
    }
}
