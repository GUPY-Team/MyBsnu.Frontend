import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListViewComponent } from 'app/modules/admin/components';

const routes: Routes = [
    {
        path: 'user-list',
        component: UserListViewComponent
    },
    {
        path: '**',
        redirectTo: 'user-list'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
