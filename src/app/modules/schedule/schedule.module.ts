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
    TeacherScheduleViewComponent
} from './components';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { MaterialModule } from 'app/modules/material/material.module';
import { SharedModule } from 'app/modules/shared/shared.module';
import { SelectListComponent } from './shared';
import { ScheduleDesignerComponent } from './components/schedule-designer/schedule-designer.component';

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
