import { Injectable } from '@angular/core';
import { ClassType } from 'app/api/models';

@Injectable({
    providedIn: 'root'
})
export class ClassTypeService {

    public readonly colorMap: ReadonlyMap<ClassType, string> = new Map(
        [
            [ClassType.Lecture, '#34D399'],
            [ClassType.Practice, '#60A5FA']
        ]);

    public getClassTypes(): ClassType[] {
        return [ClassType.Practice, ClassType.Lecture];
    }
}
