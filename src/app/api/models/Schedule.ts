import { HalfYear } from './HalfYear';

export interface Schedule {
    id: number;
    halfYear: HalfYear;
    year: number;
    version: number;
    isPublished: boolean;
}
