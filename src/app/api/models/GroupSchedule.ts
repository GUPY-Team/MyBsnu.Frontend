import { Class, Semester } from './index';

export type Classes = { [key: string]: Class[] };

export interface GroupSchedule {
    groupNumber: string;
    semester: Semester;
    year: number;
    version: number;
    classes: Classes;
}
