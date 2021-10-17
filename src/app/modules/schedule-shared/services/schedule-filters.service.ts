import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClassType, EducationFormat, Group, ScheduleClasses, Teacher } from 'app/api/models';

export interface ScheduleFilter {
    group?: Group;
    teacher?: Teacher;
    classType?: ClassType;
    classFormat?: EducationFormat;
}

@Injectable({
    providedIn: 'root'
})
export class ScheduleFiltersService {

    private _filter = new BehaviorSubject<ScheduleFilter>({});

    public readonly filter$: Observable<ScheduleFilter> = this._filter.asObservable();

    public setFilter(filter: ScheduleFilter) {
        this._filter.next(filter);
    }

    public resetFilter() {
        this._filter.next({});
    }

    public applyFilter(scheduleClasses: ScheduleClasses, filter: ScheduleFilter): ScheduleClasses {
        const filteredClasses: ScheduleClasses = {};

        for (const [weekday, classes] of Object.entries(scheduleClasses)) {
            filteredClasses[weekday] = classes.filter(c =>
                (filter.group == null || c.groups.map(g => g.id).includes(filter.group.id)) &&
                (filter.teacher == null || c.teachers.map(t => t.id).includes(filter.teacher.id)) &&
                (filter.classType == null || c.type === filter.classType) &&
                (filter.classFormat == null || c.format === filter.classFormat)
            );
        }

        return filteredClasses;
    }
}
