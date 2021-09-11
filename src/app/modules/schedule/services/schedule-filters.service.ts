import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClassType, Group, EducationFormat, Teacher } from 'app/api/models';

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
}
