import { Injectable } from '@angular/core';
import { EducationFormat } from 'app/api/models';

@Injectable({
    providedIn: 'root'
})
export class EducationFormatService {

    public getEducationFormats(): EducationFormat[] {
        return [
            EducationFormat.Online,
            EducationFormat.Offline,
            EducationFormat.Mixed
        ];
    }
}
