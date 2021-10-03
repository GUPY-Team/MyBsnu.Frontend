import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    UserListViewComponent,
    UserEditViewComponent, UserCreateViewComponent
} from 'app/modules/admin/components';

const routes: Routes = [
    {
        path: 'user-list',
        component: UserListViewComponent
    },
    {
        path: 'user-create',
        component: UserCreateViewComponent
    },
    {
        path: 'user-edit/:id',
        component: UserEditViewComponent
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
