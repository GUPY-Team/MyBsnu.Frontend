import { Component, OnDestroy, OnInit } from '@angular/core';
import { Class, WeekDay, GroupSchedule } from 'app/api/models';
import { ScheduleService, WeekdayService } from 'app/api/services';
import { fromEvent, Subject } from 'rxjs';
import { ScheduleFiltersService } from 'app/modules/schedule/services';
import { debounceTime, filter, switchMap, takeUntil, tap} from 'rxjs/operators';
import { BreakpointObserver} from '@angular/cdk/layout';

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

    private schedule?: GroupSchedule;
    private weekdays: WeekDay[] = [];

    public columns: ScheduleColumn[] = [];

    public get isLoading(): boolean {
        return this.schedule === undefined;
    }

    constructor(
        private scheduleService: ScheduleService,
        private weekdayService: WeekdayService,
        private filtersService: ScheduleFiltersService,
        private breakpointObserver: BreakpointObserver
    ) {
    }

    public ngOnInit(): void {
        this.weekdays = this.weekdayService.getStudyDays();

        this.filtersService.filter$
            .pipe(
                filter(f => f.groupId !== null),
                debounceTime(750),
                tap(_ => this.schedule = undefined),
                switchMap(f => this.scheduleService.getGroupSchedule(f.groupId!)),
                takeUntil(this.unsubscribe)
            )
            .subscribe(t => {
                this.setColumns(t);
                this.schedule = t;
            });

        fromEvent(window, 'resize')
            .pipe(
                takeUntil(this.unsubscribe)
            )
            .subscribe(_ => {
                if (this.schedule) {
                    this.setColumns(this.schedule);
                }
            });
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    private setColumns(schedule: GroupSchedule): void {
        const columns = [];

        const hideEmptyColumns = this.breakpointObserver.isMatched('(max-width: 1280px)');
        const classes = schedule.classes;

        for (const weekday of this.weekdays) {
            if (hideEmptyColumns && classes[weekday] === undefined) {
                continue;
            }
            columns.push({ day: weekday, classes: classes[weekday] ?? [] });
        }

        this.columns = columns;
    }
}
