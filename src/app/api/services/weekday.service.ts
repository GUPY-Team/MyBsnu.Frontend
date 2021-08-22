import { Injectable } from '@angular/core';
import { WeekDay } from '../models';

@Injectable({
    providedIn: 'root'
})
export class WeekdayService {
    private weekDays: ReadonlyArray<WeekDay> = [
        WeekDay.Monday,
        WeekDay.Tuesday,
        WeekDay.Wednesday,
        WeekDay.Thursday,
        WeekDay.Friday,
        WeekDay.Saturday,
        WeekDay.Sunday
    ];

    public getStudyDays(): WeekDay[] {
        return this.weekDays.slice(0, 5);
    }
}
