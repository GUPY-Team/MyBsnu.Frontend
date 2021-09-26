import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    ScheduleCreateViewComponent,
    ScheduleEditViewComponent,
    ScheduleListViewComponent
} from 'app/modules/schedule-designer/components';

const routes: Routes = [
    {
        path: 'schedule-list',
        component: ScheduleListViewComponent,
    },
    {
        path: 'schedule-edit/:id',
        component: ScheduleEditViewComponent,
    },
    {
        path: 'schedule-create',
        component: ScheduleCreateViewComponent,
    },
    {
        path: '**',
        redirectTo: 'schedule-list'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScheduleDesignerRoutingModule {
}
