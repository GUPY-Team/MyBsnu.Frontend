import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupScheduleViewComponent, TeacherScheduleViewComponent, } from './components';

const routes: Routes = [
    {
        path: 'group-schedule',
        component: GroupScheduleViewComponent
    },
    {
        path: 'teacher-schedule',
        component: TeacherScheduleViewComponent
    },
    { path: '**', redirectTo: 'group-schedule' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScheduleRoutingModule {
}
