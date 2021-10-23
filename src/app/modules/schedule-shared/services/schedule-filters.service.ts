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

    private readonly savedGroupFilterKey = 'GroupFilter';

    private _filter = new BehaviorSubject<ScheduleFilter>({});

    public readonly filter$: Observable<ScheduleFilter> = this._filter.asObservable();

    public get filter(): ScheduleFilter {
        return this._filter.value;
    }

    public set filter(filter: ScheduleFilter) {
        this._filter.next(filter);
    }

    public resetFilter() {
        this._filter.next({});
    }

    public saveGroupFilter(): void {
        if (this.filter.group == null) {
            return;
        }

        const groupFilter = JSON.stringify({ group: this.filter.group });
        localStorage.setItem(this.savedGroupFilterKey, groupFilter);
    }

    public getSavedGroupFilter(): ScheduleFilter | null {
        const filter = localStorage.getItem(this.savedGroupFilterKey);
        return filter === null ? null : JSON.parse(filter);
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
