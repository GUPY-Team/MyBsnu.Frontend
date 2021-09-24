import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
    WeekDay,
    Class,
    ScheduleClasses
} from 'app/api/models';
import { EnumService, ScheduleService } from 'app/api/services';
import { combineLatest, Observable, of } from 'rxjs';
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

    public columns: Observable<ScheduleColumn[]> = of([]);

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

        return columns;
    }
}
