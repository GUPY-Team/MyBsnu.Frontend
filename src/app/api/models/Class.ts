import { ClassType } from './ClassType';
import { WeekDay } from './WeekDay';
import { WeekType } from './WeekType';
import { EducationFormat } from './EducationFormat';

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
    teacherName: string;
    teacherId: number;
    audienceNumber: string;
    audienceId: number;
    scheduleId: number;
}
