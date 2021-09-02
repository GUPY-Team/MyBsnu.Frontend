import { Semester } from './Semester';
import { Class } from './Class';

export type GroupScheduleClasses = { [key: string]: Class[] };

export interface GroupSchedule {
    semester: Semester;
    year: number;
    classes: GroupScheduleClasses;
}
