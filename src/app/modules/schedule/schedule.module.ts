import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    GroupScheduleViewComponent,
    ScheduleBodyComponent,
    ScheduleItemComponent,
    ScheduleCurrentDateComponent,
    ScheduleFiltersComponent,
    ScheduleListViewComponent,
    ScheduleEditViewComponent,
    ScheduleEditFormComponent,
    ClassDialogComponent,
    TeacherScheduleViewComponent,
    ScheduleCreateViewComponent,
    ScheduleDesignerComponent
} from './components';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { MaterialModule } from 'app/modules/material/material.module';
import { SharedModule } from 'app/modules/shared/shared.module';
import { SelectListComponent } from './shared';

@NgModule({
    declarations: [
        GroupScheduleViewComponent,
        ScheduleBodyComponent,
        ScheduleItemComponent,
        ScheduleCurrentDateComponent,
        ScheduleFiltersComponent,
        ScheduleListViewComponent,
        ScheduleEditViewComponent,
        ScheduleEditFormComponent,
        ClassDialogComponent,
        SelectListComponent,
        TeacherScheduleViewComponent,
        ScheduleDesignerComponent,
        ScheduleCreateViewComponent,
    ],
    imports: [
        CommonModule,
        ScheduleRoutingModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class ScheduleModule {
}
