import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    ScheduleEditViewComponent,
    ScheduleListViewComponent,
    ScheduleViewComponent
} from './components';

const routes: Routes = [
    { path: '', component: ScheduleViewComponent },
    { path: 'list', component: ScheduleListViewComponent },
    { path: 'edit/:id', component: ScheduleEditViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScheduleRoutingModule {
}
