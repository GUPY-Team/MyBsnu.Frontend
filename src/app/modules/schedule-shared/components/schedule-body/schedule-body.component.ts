import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Class, ScheduleClasses, WeekDay } from 'app/api/models';
import { EnumService, ScheduleService } from 'app/api/services';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AppBreakpoints } from 'app/core';
import { ScheduleFiltersService } from 'app/modules/schedule-shared/services';

interface ScheduleColumn {
    day: WeekDay;
    classes: Class[];
}

@Component({
    selector: 'app-schedule-body',
    templateUrl: './schedule-body.component.html',
    styleUrls: ['./schedule-body.component.scss']
})
export class ScheduleBodyComponent implements OnInit {

    private weekdays: WeekDay[] = [];
    private resize$: Observable<BreakpointState>;

    public columns!: Observable<ScheduleColumn[]>;
    private emptyColumns: ScheduleColumn[] = [
        { day: WeekDay.Monday, classes: [] },
        { day: WeekDay.Tuesday, classes: [] },
        { day: WeekDay.Wednesday, classes: [] },
        { day: WeekDay.Thursday, classes: [] },
        { day: WeekDay.Friday, classes: [] },
    ];

    @Input()
    public set classes(classes$: Observable<ScheduleClasses>) {
        this.columns = combineLatest([
            classes$,
            this.resize$
        ]).pipe(
            map(([classes, breakpoint]) => this.createColumns(classes, breakpoint)),
        );
    }

    @Input()
    public editMode: boolean = false;

    @Output()
    public classEdit = new EventEmitter<Class>();

    constructor(
        private scheduleService: ScheduleService,
        private enumService: EnumService,
        private filtersService: ScheduleFiltersService,
        private breakpointObserver: BreakpointObserver
    ) {
        this.resize$ = this.breakpointObserver.observe(AppBreakpoints.lg);
    }

    public ngOnInit(): void {
        this.weekdays = this.enumService.getStudyDays();
    }

    private createColumns(classes: ScheduleClasses, breakpoint: BreakpointState): ScheduleColumn[] {
        const columns: ScheduleColumn[] = [];

        const hideEmptyColumns = !breakpoint.matches;

        for (const weekday of this.weekdays) {
            if (hideEmptyColumns && classes[weekday] === undefined) {
                continue;
            }
            columns.push({ day: weekday, classes: classes[weekday] ?? [] });
        }

        return columns.length === 0 ? this.emptyColumns : columns;
    }
}
