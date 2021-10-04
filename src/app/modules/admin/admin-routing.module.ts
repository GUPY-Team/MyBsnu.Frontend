import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    AdminViewComponent,
    CourseCreateViewComponent,
    CourseEditViewComponent,
    CourseListViewComponent,
    UserCreateViewComponent,
    UserEditViewComponent,
    UserListViewComponent
} from './components';

const routes: Routes = [
    {
        path: '',
        component: AdminViewComponent
    },
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
        path: 'courses',
        component: CourseListViewComponent
    },
    {
        path: 'courses/create',
        component: CourseCreateViewComponent
    },
    {
        path: 'courses/:id',
        component: CourseEditViewComponent,
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
