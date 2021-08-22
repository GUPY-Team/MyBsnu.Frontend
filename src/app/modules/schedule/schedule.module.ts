import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    ScheduleViewComponent,
    ScheduleBodyComponent,
    ScheduleItemComponent,
    ScheduleCurrentDateComponent,
    ScheduleFiltersComponent,
} from './components';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { MaterialModule } from 'app/modules/material/material.module';

@NgModule({
    declarations: [
        ScheduleViewComponent,
        ScheduleBodyComponent,
        ScheduleItemComponent,
        ScheduleCurrentDateComponent,
        ScheduleFiltersComponent,
    ],
    imports: [
        CommonModule,
        ScheduleRoutingModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
    ]
})
export class ScheduleModule {
}
