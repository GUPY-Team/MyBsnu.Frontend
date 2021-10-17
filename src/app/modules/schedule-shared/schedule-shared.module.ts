import { NgModule } from '@angular/core';
import { SharedModule } from 'app/modules/shared/shared.module';
import { ScheduleBodyComponent, ScheduleCurrentDateComponent, ScheduleFiltersComponent, ScheduleItemComponent } from 'app/modules/schedule-shared/components';


@NgModule({
    declarations: [
        ScheduleBodyComponent,
        ScheduleItemComponent,
        ScheduleCurrentDateComponent,
        ScheduleFiltersComponent,
    ],
    exports: [
        ScheduleBodyComponent,
        ScheduleItemComponent,
        ScheduleCurrentDateComponent,
        ScheduleFiltersComponent,
    ],
    imports: [
        SharedModule
    ]
})
export class ScheduleSharedModule {
}
