import { Injectable } from '@angular/core';
import { Semester } from 'app/api/models';

@Injectable({
    providedIn: 'root'
})
export class SemesterService {

    public getSemesters(): Semester[] {
        return [Semester.First, Semester.Second];
    }
}
