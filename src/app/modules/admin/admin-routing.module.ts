import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    AudienceCreateViewComponent,
    AudienceEditViewComponent,
    AudienceListViewComponent,
    CourseCreateViewComponent,
    CourseEditViewComponent,
    CourseListViewComponent,
    GroupCreateViewComponent,
    GroupEditViewComponent,
    GroupListViewComponent,
    TeacherCreateViewComponent,
    TeacherEditViewComponent,
    TeacherListViewComponent,
    UserCreateViewComponent,
    UserEditViewComponent,
    UserListViewComponent
} from './components';
import { Permission } from 'app/api/models/Permission';

const routes: Routes = [
    {
        path: 'users',
        component: UserListViewComponent,
        data: { permissions: [Permission.superAdmin] }
    },
    {
        path: 'users/create',
        component: UserCreateViewComponent,
        data: { permissions: [Permission.superAdmin] }
    },
    {
        path: 'users/:id',
        component: UserEditViewComponent,
        data: { permissions: [Permission.superAdmin] }
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
        path: 'groups',
        component: GroupListViewComponent
    },
    {
        path: 'groups/create',
        component: GroupCreateViewComponent
    },
    {
        path: 'groups/:id',
        component: GroupEditViewComponent
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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
