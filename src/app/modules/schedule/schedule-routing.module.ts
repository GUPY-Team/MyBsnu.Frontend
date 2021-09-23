import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    ScheduleEditViewComponent,
    ScheduleListViewComponent,
    GroupScheduleViewComponent,
    TeacherScheduleViewComponent,
    ScheduleCreateViewComponent
} from './components';
import { AuthorizedOnlyGuard } from 'app/modules/auth/guards/authorized-only.guard';

const routes: Routes = [
    {
        path: 'group-schedule',
        component: GroupScheduleViewComponent
    },
    {
        path: 'teacher-schedule',
        component: TeacherScheduleViewComponent
    },
    {
        path: 'list',
        component: ScheduleListViewComponent,
        canActivate: [AuthorizedOnlyGuard],
    },
    {
        path: 'edit/:id',
        component: ScheduleEditViewComponent,
        canActivate: [AuthorizedOnlyGuard],
    },
    {
        path: 'create',
        component: ScheduleCreateViewComponent,
        canActivate: [AuthorizedOnlyGuard]
    },
    { path: '**', redirectTo: 'group-schedule' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScheduleRoutingModule {
}
