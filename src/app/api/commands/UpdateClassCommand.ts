import {
    ClassType,
    EducationFormat,
    Time,
    WeekDay,
    WeekType
} from 'app/api/models';

export interface UpdateClassCommand {
    id: number;
    format: EducationFormat;
    type: ClassType;
    weekDay: WeekDay;
    weekType: WeekType;
    startTime: Time;
    endTime: Time;
    courseId: number;
    teachers: number[];
    audiences: number[];
    groups: number[];
}
