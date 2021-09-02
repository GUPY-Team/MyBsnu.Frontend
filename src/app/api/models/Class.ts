import { EducationFormat } from './EducationFormat';
import { ClassType } from './ClassType';
import { WeekDay } from './WeekDay';
import { WeekType } from './WeekType';
import { Teacher } from './Teacher';
import { Audience } from './Audience';
import { Group } from './Group';

export interface Class {
    id: number;
    format: EducationFormat;
    type: ClassType;
    weekDay: WeekDay;
    weekType: WeekType;
    startTime: string;
    endTime: string;
    duration: string;
    courseName: string;
    courseId: number;
    teachers: Teacher[];
    audiences: Audience[];
    groups: Group[];
    scheduleId: number;
}
