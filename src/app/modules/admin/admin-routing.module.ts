import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    CourseCreateViewComponent,
    CourseEditViewComponent,
    CourseListViewComponent,
    UserCreateViewComponent,
    UserEditViewComponent,
    UserListViewComponent
} from './components';

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
        redirectTo: 'users'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
