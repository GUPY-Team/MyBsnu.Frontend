import { NgModule } from '@angular/core';
import { ScheduleDesignerRoutingModule } from './schedule-designer-routing.module';
import {
    ClassFormComponent,
    ClassInfoComponent,
    ClassPeriodComponent,
    ScheduleCreateViewComponent,
    ScheduleDesignerComponent,
    ScheduleEditFormComponent,
    ScheduleEditViewComponent,
    ScheduleListViewComponent,
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
        ClassInfoComponent,
    ],
    imports: [
        ScheduleDesignerRoutingModule,
        ScheduleSharedModule,
        SharedModule,
    ]
})
export class ScheduleDesignerModule {
}
