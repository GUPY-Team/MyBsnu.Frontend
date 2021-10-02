import { Component, Input } from '@angular/core';
import { getErrorMessages } from 'app/core';
import { FormGroup } from '@angular/forms';
import { ClassType, EducationFormat, WeekDay, WeekType } from 'app/api/models';

@Component({
    selector: 'app-class-period',
    templateUrl: './class-period.component.html',
    styleUrls: ['./class-period.component.scss'],
})
export class ClassPeriodComponent {

    @Input()
    public group!: FormGroup;

    @Input()
    public educationFormats: EducationFormat[] = [];

    @Input()
    public classTypes: ClassType[] = [];

    @Input()
    public weekdays: WeekDay[] = [];

    @Input()
    public weekTypes: WeekType[] = [];

    public get errors() {
        return getErrorMessages(this.group);
    }
}
