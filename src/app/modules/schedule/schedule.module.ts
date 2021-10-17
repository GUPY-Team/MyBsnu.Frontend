import { NgModule } from '@angular/core';
import { GroupScheduleViewComponent, TeacherScheduleViewComponent, } from './components';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { SharedModule } from 'app/modules/shared/shared.module';
import { ScheduleSharedModule } from 'app/modules/schedule-shared/schedule-shared.module';

@NgModule({
    declarations: [
        GroupScheduleViewComponent,
        TeacherScheduleViewComponent,
    ],
    imports: [
        ScheduleRoutingModule,
        SharedModule,
        ScheduleSharedModule
    ]
})
export class ScheduleModule {
}
