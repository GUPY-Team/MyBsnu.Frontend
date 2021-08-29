import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    ScheduleViewComponent,
    ScheduleBodyComponent,
    ScheduleItemComponent,
    ScheduleCurrentDateComponent,
    ScheduleFiltersComponent,
    ScheduleListViewComponent,
    ScheduleEditViewComponent,
    ScheduleEditFormComponent
} from './components';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { MaterialModule } from 'app/modules/material/material.module';
import { SharedModule } from 'app/modules/shared/shared.module';
import { ClassDialogComponent } from './components/class-dialog/class-dialog.component';

@NgModule({
    declarations: [
        ScheduleViewComponent,
        ScheduleBodyComponent,
        ScheduleItemComponent,
        ScheduleCurrentDateComponent,
        ScheduleFiltersComponent,
        ScheduleListViewComponent,
        ScheduleEditViewComponent,
        ScheduleEditFormComponent,
        ClassDialogComponent,
    ],
    imports: [
        CommonModule,
        ScheduleRoutingModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule,
    ]
})
export class ScheduleModule {
}
