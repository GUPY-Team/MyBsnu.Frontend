import { Component } from '@angular/core';

@Component({
    selector: 'app-schedule-current-date',
    templateUrl: './schedule-current-date.component.html',
    styleUrls: ['./schedule-current-date.component.scss']
})
export class ScheduleCurrentDateComponent {
    public currentDate: Date = new Date();
}
