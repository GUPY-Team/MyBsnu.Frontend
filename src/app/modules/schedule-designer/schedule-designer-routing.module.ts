import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedOnlyGuard } from 'app/modules/auth/guards';
import {
    ScheduleCreateViewComponent,
    ScheduleEditViewComponent,
    ScheduleListViewComponent
} from 'app/modules/schedule-designer/components';

const routes: Routes = [
    {
        path: 'schedule-list',
        component: ScheduleListViewComponent,
        canActivate: [AuthorizedOnlyGuard],
    },
    {
        path: 'schedule-edit/:id',
        component: ScheduleEditViewComponent,
        canActivate: [AuthorizedOnlyGuard],
    },
    {
        path: 'schedule-create',
        component: ScheduleCreateViewComponent,
        canActivate: [AuthorizedOnlyGuard]
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
