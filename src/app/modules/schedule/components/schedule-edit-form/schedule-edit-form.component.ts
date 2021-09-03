import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators, getErrorMessages } from 'app/core';
import { Schedule, Semester } from 'app/api/models';
import { EnumService } from 'app/api/services';

@Component({
    selector: 'app-schedule-edit-form',
    templateUrl: './schedule-edit-form.component.html',
    styleUrls: ['./schedule-edit-form.component.scss']
})
export class ScheduleEditFormComponent implements OnInit {

    public scheduleForm!: FormGroup;

    public semesters: Semester[] = [];

    public get errors() {
        return getErrorMessages(this.scheduleForm);
    }

    @Input()
    public schedule!: Schedule;

    constructor(
        private enumService: EnumService,
        private formBuilder: FormBuilder
    ) {
    }

    public ngOnInit(): void {
        this.semesters = this.enumService.getSemesters();

        const currentYear = new Date().getFullYear();

        const schedule = this.schedule;
        this.scheduleForm = this.formBuilder.group({
            year: [schedule.year, [Validators.required, Validators.min(currentYear), Validators.max(currentYear + 1)]],
            semester: [schedule.semester, [Validators.required, CustomValidators.isInEnumValidator(Semester)]],
            version: [schedule.version]
        });

        this.scheduleForm.controls['version'].disable();
    }

    public get saveDisabled(): boolean {
        return !(this.scheduleForm.dirty && this.scheduleForm.valid);
    }

    public get publishDisabled(): boolean {
        return this.schedule.isPublished;
    }

    public get deleteDisabled(): boolean {
        return this.schedule.isPublished;
    }
}
