import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Class, WeekDay, GroupSchedule } from 'app/api/models';
import { ScheduleService, WeekdayService } from 'app/api/services';
import { combineLatest, Observable, of, Subject } from 'rxjs';
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
export class ScheduleBodyComponent implements OnInit, OnDestroy {

    private unsubscribe = new Subject();

    private weekdays: WeekDay[] = [];
    private resize$: Observable<BreakpointState>;

    public columns: Observable<ScheduleColumn[]> = of([]);

    @Input()
    public set schedule(schedule$: Observable<GroupSchedule>) {
        this.columns = combineLatest([
            schedule$,
            this.resize$
        ]).pipe(
            map(([schedule, breakpoint]) => this.createColumns(schedule, breakpoint)),
        );
    }

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

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    private createColumns(schedule: GroupSchedule | null, breakpoint: BreakpointState): ScheduleColumn[] {
        const columns: ScheduleColumn[] = [];

        if (schedule === null) {
            return columns;
        }

        const hideEmptyColumns = !breakpoint.matches;
        const classes = schedule.classes;

        for (const weekday of this.weekdays) {
            if (hideEmptyColumns && classes[weekday] === undefined) {
                continue;
            }
            columns.push({ day: weekday, classes: classes[weekday] ?? [] });
        }

        return columns;
    }
}
