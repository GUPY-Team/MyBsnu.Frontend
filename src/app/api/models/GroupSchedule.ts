import { Semester } from './Semester';
import { ScheduleClasses } from './ScheduleClasses';

export interface GroupSchedule {
    semester: Semester;
    year: number;
    classes: ScheduleClasses;
}
