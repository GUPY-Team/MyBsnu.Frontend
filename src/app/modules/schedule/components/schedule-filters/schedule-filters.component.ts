import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
    EnumService,
    GroupService,
    TeacherService,
} from 'app/api/services';
import { ClassType, WeekDay, EducationFormat, Group } from 'app/api/models';
import { ScheduleFiltersService } from '../../services';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-schedule-filters',
    templateUrl: './schedule-filters.component.html',
    styleUrls: ['./schedule-filters.component.scss']
})
export class ScheduleFiltersComponent implements OnInit {

    public groupControl = new FormControl();
    public educationFormatControl = new FormControl();
    public classTypeControl = new FormControl();
    public weekdayControl = new FormControl();

    public groups$: Observable<Group[]> = of([]);
    public weekdays: WeekDay[] = [];
    public classTypes: ClassType[] = [];
    public educationFormats: EducationFormat[] = [];

    public classTypeColorMap = this.enumService.classTypeColorMap;

    constructor(
        private groupService: GroupService,
        private teacherService: TeacherService,
        private enumService: EnumService,
        private filtersService: ScheduleFiltersService,
    ) {
    }

    public ngOnInit(): void {
        this.fetchData();
    }

    public groupSelected(): void {
        this.filtersService.setGroupFilter(this.groupControl.value);
    }

    public educationFormatSelected(): void {
        this.filtersService.setEducationFormatFilter(this.educationFormatControl.value);
    }

    public weekdaySelected(): void {
        this.filtersService.setWeekdayFilter(this.weekdayControl.value);
    }

    public classTypeSelected(): void {
        this.filtersService.setClassTypeFilter(this.classTypeControl.value);
    }

    private fetchData(): void {
        this.groups$ = this.groupService.getGroups()
            .pipe(
                tap(groups => {
                    this.groupControl.setValue(groups[0]);
                    this.filtersService.setGroupFilter(groups[0]);
                })
            );

        this.weekdays = this.enumService.getStudyDays();
        this.classTypes = this.enumService.getClassTypes();
        this.educationFormats = this.enumService.getEducationFormats();
    }
}
