import { Component, Input } from '@angular/core';
import { Class, ClassType, EducationFormat, WeekDay, WeekType } from 'app/api/models';
import { ClassTypeService } from 'app/api/services';

interface ScheduleItem {
    format: EducationFormat;
    type: ClassType;
    weekDay: WeekDay;
    weekType: WeekType;
    startTime: string;
    endTime: string;
    courseName: string;
    teachers: string;
    audiences: string;
}

@Component({
    selector: 'app-schedule-item',
    templateUrl: './schedule-item.component.html',
    styleUrls: ['./schedule-item.component.scss']
})
export class ScheduleItemComponent {

    public item!: ScheduleItem;

    @Input()
    public set class(class_: Class) {
        this.item = {
            ...class_,
            teachers: class_.teachers.map(t => t.fullName).join(', '),
            audiences: class_.audiences.map(a => a.fullNumber).join(', ')
        };
    }

    public format = EducationFormat;
    public type = ClassType;

    constructor(private classTypeService: ClassTypeService) {
    }

    public get lineStyle() {
        return {
            'background-color': this.classTypeService.colorMap.get(this.item.type)
        };
    }
}
