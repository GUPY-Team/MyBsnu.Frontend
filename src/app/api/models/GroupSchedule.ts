import { Class, HalfYear } from './index';

export type Classes = { [key: string]: Class[] };

export interface GroupSchedule {
    groupNumber: string;
    halfYear: HalfYear;
    year: number;
    version: number;
    classes: Classes;
}
