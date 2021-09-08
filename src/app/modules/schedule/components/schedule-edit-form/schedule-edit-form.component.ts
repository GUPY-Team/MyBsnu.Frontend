import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators, getErrorMessages } from 'app/core';
import { Schedule, Semester } from 'app/api/models';
import { EnumService, ScheduleService } from 'app/api/services';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-schedule-edit-form',
    templateUrl: './schedule-edit-form.component.html',
    styleUrls: ['./schedule-edit-form.component.scss']
})
export class ScheduleEditFormComponent implements OnInit, OnDestroy {

    private unsubscribe = new Subject();

    public copyDisabled = false;
    public publishDisabled = false;
    public deleteDisabled = false;

    public scheduleForm!: FormGroup;

    public semesters: Semester[] = [];

    public get errors() {
        return getErrorMessages(this.scheduleForm);
    }

    @Input()
    public schedule!: Schedule;

    constructor(
        private enumService: EnumService,
        private scheduleService: ScheduleService,
        private snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
    }

    public ngOnInit(): void {
        this.semesters = this.enumService.getSemesters();

        const currentYear = new Date().getFullYear();

        const schedule = this.schedule;
        this.scheduleForm = this.formBuilder.group({
            id: [schedule.id],
            year: [schedule.year, [Validators.required, Validators.min(currentYear), Validators.max(currentYear + 1)]],
            semester: [schedule.semester, [Validators.required, CustomValidators.isInEnumValidator(Semester)]],
            version: [{
                value: schedule.version,
                disabled: true
            }]
        });

        this.publishDisabled = this.schedule.isPublished;
        this.deleteDisabled = this.schedule.isPublished;
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public get saveDisabled(): boolean {
        return !(this.scheduleForm.dirty && this.scheduleForm.valid);
    }

    public onSave(): void {
        if (!this.scheduleForm.valid) {
            return;
        }

        const command = this.scheduleForm.value;
        this.scheduleService.updateSchedule(command)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(r => {
                this.scheduleForm.patchValue(r);
                this.scheduleForm.markAsPristine();
            });
    }

    public onPublish(): void {
        this.scheduleService.publishSchedule(this.schedule.id)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(r => {
                this.publishDisabled = r.isPublished;
                this.deleteDisabled = r.isPublished;
            });
    }

    public onCopy(): void {
        this.copyDisabled = true;

        this.scheduleService.copySchedule(this.schedule.id)
            .pipe(
                takeUntil(this.unsubscribe),
                finalize(() => this.copyDisabled = false)
            )
            .subscribe(() => {
                this.snackBar.open('Schedule copied successfully!', '', {
                    panelClass: 'snackbar'
                });
            });
    }

    public onDelete(): void {
        this.scheduleService.deleteSchedule(this.schedule.id)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() => this.router.navigate(['/schedule/list']));
    }
}
