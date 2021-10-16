import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'app/modules/shared/shared.module';
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

@NgModule({
    declarations: [
        UserListViewComponent,
        UserEditViewComponent,
        UserCreateViewComponent,
        CourseCreateViewComponent,
        CourseListViewComponent,
        CourseEditViewComponent,
        TeacherListViewComponent,
        TeacherCreateViewComponent,
        TeacherEditViewComponent,
        AudienceListViewComponent,
        AudienceCreateViewComponent,
        AudienceEditViewComponent,
        GroupListViewComponent,
        GroupEditViewComponent,
        GroupCreateViewComponent
    ],
    imports: [
        SharedModule,
        AdminRoutingModule
    ]
})
export class AdminModule {
}
