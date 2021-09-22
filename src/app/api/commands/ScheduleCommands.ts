import { Semester } from 'app/api/models';

export interface CreateScheduleCommand {
    semester: Semester;
    year: number;
}

export interface UpdateScheduleCommand {
    id: number;
    year: number;
    semester: string;
}
