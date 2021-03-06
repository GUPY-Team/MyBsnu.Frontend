import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { EnumService, } from 'app/api/services';
import { ClassType, EducationFormat, Group, Teacher } from 'app/api/models';
import { ScheduleFiltersService } from '../../services';
import { takeUntil } from 'rxjs/operators';
import { compareEntities } from 'app/core';

@Component({
    selector: 'app-schedule-filters',
    templateUrl: './schedule-filters.component.html',
    styleUrls: ['./schedule-filters.component.scss']
})
export class ScheduleFiltersComponent implements OnInit, OnDestroy {

    private unsubscribe = new Subject();

    public classTypeColorMap = this.enumService.classTypeColorMap;
    public filtersForm!: FormGroup;

    @Input()
    public groups: Group[] = [];

    @Input()
    public teachers: Teacher[] = [];

    @Input()
    public classTypes: ClassType[] = [];

    @Input()
    public educationFormats: EducationFormat[] = [];

    constructor(
        private enumService: EnumService,
        private filtersService: ScheduleFiltersService,
        private formBuilder: FormBuilder
    ) {
    }

    public ngOnInit(): void {
        this.filtersForm = this.formBuilder.group({
            group: [null],
            teacher: [null],
            classType: [null],
            classFormat: [null]
        });

        this.filtersForm.valueChanges.pipe(
            takeUntil(this.unsubscribe)
        ).subscribe(value => this.filtersService.filter = value);

        this.filtersService.filter$.pipe(
            takeUntil(this.unsubscribe)
        ).subscribe(value => this.filtersForm.patchValue(value, { emitEvent: false }));
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public compareEntities = compareEntities;
}
