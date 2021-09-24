import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedOnlyGuard, GuestOnlyGuard } from 'app/modules/auth/guards';

const routes: Routes = [
    {
        path: 'schedule',
        loadChildren: () => import('app/modules/schedule/schedule.module').then(m => m.ScheduleModule)
    },
    {
        path: 'designer',
        loadChildren: () => import('app/modules/schedule-designer/schedule-designer.module').then(m => m.ScheduleDesignerModule),
        canLoad: [AuthorizedOnlyGuard],
        canActivate: [AuthorizedOnlyGuard],
        canActivateChild: [AuthorizedOnlyGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('app/modules/auth/auth.module').then(m => m.AuthModule),
        canLoad: [GuestOnlyGuard],
        canActivate: [GuestOnlyGuard],
        canActivateChild: [GuestOnlyGuard]
    },
    {
        path: '**',
        redirectTo: 'schedule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
