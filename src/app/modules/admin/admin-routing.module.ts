import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    UserListViewComponent,
    UserEditViewComponent, UserCreateViewComponent
} from 'app/modules/admin/components';

const routes: Routes = [
    {
        path: 'users',
        component: UserListViewComponent
    },
    {
        path: 'users/create',
        component: UserCreateViewComponent
    },
    {
        path: 'users/:id',
        component: UserEditViewComponent
    },
    {
        path: '**',
        redirectTo: 'users'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
