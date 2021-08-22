import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { ClassType, WeekDay, Group, EducationFormat } from 'app/api/models';
import { map } from 'rxjs/operators';

export interface ScheduleFilter {
    groupId: number | null,
    classFormat: EducationFormat | null,
    classType: ClassType | null,
    weekday: WeekDay | null
}

@Injectable({
    providedIn: 'root'
})
export class ScheduleFiltersService {

    private _groupFilter = new BehaviorSubject<Group | null>(null);
    private _educationFormatFilter = new BehaviorSubject<EducationFormat | null>(null);
    private _classTypeFilter = new BehaviorSubject<ClassType | null>(null);
    private _weekdayFilter = new BehaviorSubject<WeekDay | null>(null);

    public readonly filter$: Observable<ScheduleFilter> =
        combineLatest([this._groupFilter, this._educationFormatFilter, this._classTypeFilter, this._weekdayFilter])
            .pipe(
                map(([group, classPlace, classType, weekday]) => ({
                    groupId: group?.id ?? null,
                    classFormat: classPlace,
                    classType,
                    weekday,
                }))
            );

    public setGroupFilter(group: Group | null): void {
        this._groupFilter.next(group);
    }

    public setEducationFormatFilter(format: EducationFormat | null): void {
        this._educationFormatFilter.next(format);
    }

    public setClassTypeFilter(classType: ClassType | null): void {
        this._classTypeFilter.next(classType);
    }

    public setWeekdayFilter(weekday: WeekDay | null): void {
        this._weekdayFilter.next(weekday);
    }
}
