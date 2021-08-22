import { ClassType } from './ClassType';
import { WeekDay } from 'app/api/models/WeekDay';
import { WeekType } from './WeekType';
import { EducationFormat } from 'app/api/models/EducationFormat';

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
    teacherName: string;
    audienceNumber: string;
}
