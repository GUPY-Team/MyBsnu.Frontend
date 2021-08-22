import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleViewComponent } from './components';

const routes: Routes = [
    { path: '', component: ScheduleViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScheduleRoutingModule {
}
