import { Injectable } from '@angular/core';
import { ClassType, EducationFormat, Semester, WeekDay, WeekType } from 'app/api/models';

@Injectable({
    providedIn: 'root'
})
export class EnumService {

    public readonly classTypeColorMap: ReadonlyMap<ClassType, string> = new Map(
        [
            [ClassType.Lecture, '#34D399'],
            [ClassType.Practice, '#60A5FA']
        ]);

    public getClassTypes(): ClassType[] {
        return [ClassType.Practice, ClassType.Lecture];
    }

    public getEducationFormats(): EducationFormat[] {
        return [
            EducationFormat.Online,
            EducationFormat.Offline,
            EducationFormat.Mixed
        ];
    }

    public getStudyDays(): WeekDay[] {
        return [
            WeekDay.Monday,
            WeekDay.Tuesday,
            WeekDay.Wednesday,
            WeekDay.Thursday,
            WeekDay.Friday
        ];
    }

    public getWeekTypes(): WeekType[] {
        return [WeekType.Odd, WeekType.Even];
    }

    public getSemesters(): Semester[] {
        return [Semester.First, Semester.Second];
    }
}
