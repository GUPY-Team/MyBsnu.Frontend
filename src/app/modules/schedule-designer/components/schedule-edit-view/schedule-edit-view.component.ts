import { Component } from '@angular/core';
import { GroupService, ScheduleService } from 'app/api/services';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Schedule } from 'app/api/models';

@Component({
    selector: 'app-schedule-edit-view',
    templateUrl: './schedule-edit-view.component.html',
    styleUrls: ['./schedule-edit-view.component.scss']
})
export class ScheduleEditViewComponent {

    public schedule$: Observable<Schedule>;

    constructor(
        private scheduleService: ScheduleService,
        private groupService: GroupService,
        private activatedRoute: ActivatedRoute,
    ) {
        const scheduleId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        this.schedule$ = this.scheduleService.getScheduleById(scheduleId);
    }
}
