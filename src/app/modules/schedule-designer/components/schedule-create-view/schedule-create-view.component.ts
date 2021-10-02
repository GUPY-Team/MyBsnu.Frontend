import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'app/core';
import { Semester } from 'app/api/models';
import { EnumService, ScheduleService } from 'app/api/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-schedule-create-view',
    templateUrl: './schedule-create-view.component.html',
    styleUrls: ['./schedule-create-view.component.scss']
})
export class ScheduleCreateViewComponent implements OnInit, OnDestroy {

    private unsubscribe = new Subject();

    public scheduleForm!: FormGroup;

    public semesters: Semester[] = [];

    public submitDisabled = false;

    constructor(
        private scheduleService: ScheduleService,
        private enumService: EnumService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
    }

    public ngOnInit(): void {
        this.semesters = this.enumService.getSemesters();

        const currentYear = new Date().getFullYear();

        this.scheduleForm = this.formBuilder.group({
            year: [currentYear, [Validators.required, Validators.min(currentYear), Validators.max(currentYear + 1)]],
            semester: [Semester.First, [Validators.required, CustomValidators.isInEnumValidator(Semester)]],
        });
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public onSubmit(): void {
        if (!this.scheduleForm.valid) {
            return;
        }

        const command = this.scheduleForm.value;

        this.submitDisabled = true;

        this.scheduleService.createSchedule(command).pipe(
            takeUntil(this.unsubscribe)
        ).subscribe(
            schedule => this.router.navigate(['/designer/schedule-edit', schedule.id]),
            _ => this.submitDisabled = false
        );
    }
}
