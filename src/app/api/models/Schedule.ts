import { Semester } from 'app/api/models/Semester';

export interface Schedule {
    id: number;
    semester: Semester;
    year: number;
    version: number;
    isPublished: boolean;
}
