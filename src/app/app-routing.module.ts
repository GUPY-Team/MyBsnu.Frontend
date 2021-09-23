import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestOnlyGuard } from 'app/modules/auth/guards';

const routes: Routes = [
    {
        path: 'schedule',
        loadChildren: () => import('app/modules/schedule/schedule.module').then(m => m.ScheduleModule)
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
