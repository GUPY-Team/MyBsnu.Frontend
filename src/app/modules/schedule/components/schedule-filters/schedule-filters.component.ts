import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import {
    ClassTypeService,
    GroupService,
    TeachersService,
    WeekdayService,
    EducationFormatService,
} from 'app/api/services';
import { ClassType, WeekDay, EducationFormat, Group } from 'app/api/models';
import { ScheduleFiltersService } from '../../services';

@Component({
    selector: 'app-schedule-filters',
    templateUrl: './schedule-filters.component.html',
    styleUrls: ['./schedule-filters.component.scss']
})
export class ScheduleFiltersComponent implements OnInit, OnDestroy {

    private unsubscribe = new Subject();

    public groupControl = new FormControl();
    public educationFormatControl = new FormControl();
    public classTypeControl = new FormControl();
    public weekdayControl = new FormControl();

    public groups: Group[] = [];
    public weekdays: WeekDay[] = [];
    public classTypes: ClassType[] = [];
    public educationFormats: EducationFormat[] = [];

    public controls: FormArray = new FormArray([
        this.groupControl,
        this.educationFormatControl,
        this.weekdayControl,
        this.classTypeControl
    ]);

    public classTypeColorMap = this.classTypeService.colorMap;

    constructor(
        private groupService: GroupService,
        private teacherService: TeachersService,
        private weekdayService: WeekdayService,
        private classTypeService: ClassTypeService,
        private educationFormatService: EducationFormatService,
        private filtersService: ScheduleFiltersService,
    ) {
    }

    public ngOnInit(): void {
        this.fetchData();
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
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
        this.groupService.getGroups().subscribe(g => {
            this.groups = g;
            this.groupControl.setValue(this.groups[0]);
            this.filtersService.setGroupFilter(this.groups[0]);
        });

        this.weekdays = this.weekdayService.getStudyDays();
        this.classTypes = this.classTypeService.getClassTypes();
        this.educationFormats = this.educationFormatService.getEducationFormats();
    }
}
