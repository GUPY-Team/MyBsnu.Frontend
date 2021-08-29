import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Class, WeekDay, Classes } from 'app/api/models';
import { ScheduleService, WeekdayService } from 'app/api/services';
import { combineLatest, Observable, of } from 'rxjs';
import { ScheduleFiltersService } from 'app/modules/schedule/services';
import { map } from 'rxjs/operators';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AppBreakpoints } from 'app/core';

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
    public set classes(classes$: Observable<Classes>) {
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
        private weekdayService: WeekdayService,
        private filtersService: ScheduleFiltersService,
        private breakpointObserver: BreakpointObserver
    ) {
        this.resize$ = this.breakpointObserver.observe(AppBreakpoints.lg);
    }

    public ngOnInit(): void {
        this.weekdays = this.weekdayService.getStudyDays();
    }

    private createColumns(classes: Classes, breakpoint: BreakpointState): ScheduleColumn[] {
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
