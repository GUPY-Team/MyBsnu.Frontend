import { Component, Input } from '@angular/core';
import { Class, EducationFormat } from 'app/api/models';
import { ClassTypeService } from 'app/api/services';

@Component({
    selector: 'app-schedule-item',
    templateUrl: './schedule-item.component.html',
    styleUrls: ['./schedule-item.component.scss']
})
export class ScheduleItemComponent {

    @Input() class!: Class;

    public format = EducationFormat;

    constructor(private classTypeService: ClassTypeService) {
    }

    public get lineStyle() {
        return {
            'background-color': this.classTypeService.colorMap.get(this.class.type)
        };
    }
}
