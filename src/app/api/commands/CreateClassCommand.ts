import {
    ClassType,
    EducationFormat,
    Time,
    WeekDay,
    WeekType
} from 'app/api/models';

export interface CreateClassCommand {
    format: EducationFormat;
    type: ClassType;
    weekDay: WeekDay;
    weekType: WeekType;
    startTime: Time;
    endTime: Time;
    courseId: number;
    scheduleId: number;
    teachers: number[];
    audiences: number[];
    groups: number[];
}
