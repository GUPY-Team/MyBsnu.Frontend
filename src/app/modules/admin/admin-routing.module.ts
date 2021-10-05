import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    AdminViewComponent,
    AudienceCreateViewComponent,
    AudienceEditViewComponent,
    AudienceListViewComponent,
    CourseCreateViewComponent,
    CourseEditViewComponent,
    CourseListViewComponent,
    TeacherCreateViewComponent,
    TeacherEditViewComponent,
    TeacherListViewComponent,
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
        path: 'teachers',
        component: TeacherListViewComponent
    },
    {
        path: 'teachers/create',
        component: TeacherCreateViewComponent
    },
    {
        path: 'teachers/:id',
        component: TeacherEditViewComponent
    },
    {
        path: 'audiences',
        component: AudienceListViewComponent,
    },
    {
        path: 'audiences/create',
        component: AudienceCreateViewComponent
    },
    {
        path: 'audiences/:id',
        component: AudienceEditViewComponent
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
