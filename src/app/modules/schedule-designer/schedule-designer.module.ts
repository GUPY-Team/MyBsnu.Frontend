import { NgModule } from '@angular/core';
import { ScheduleDesignerRoutingModule } from './schedule-designer-routing.module';
import {
    ScheduleCreateViewComponent,
    ScheduleEditViewComponent,
    ScheduleListViewComponent,
    ScheduleDesignerComponent,
    ScheduleEditFormComponent,
    ClassFormComponent,
    ClassPeriodComponent,
    ClassInfoFormComponent,
} from 'app/modules/schedule-designer/components';
import { SharedModule } from 'app/modules/shared/shared.module';
import { ScheduleSharedModule } from 'app/modules/schedule-shared/schedule-shared.module';


@NgModule({
    declarations: [
        ScheduleCreateViewComponent,
        ScheduleListViewComponent,
        ScheduleEditViewComponent,
        ScheduleDesignerComponent,
        ScheduleEditFormComponent,
        ClassFormComponent,
        ClassPeriodComponent,
        ClassInfoFormComponent,
    ],
    imports: [
        ScheduleDesignerRoutingModule,
        ScheduleSharedModule,
        SharedModule,
    ]
})
export class ScheduleDesignerModule {
}
