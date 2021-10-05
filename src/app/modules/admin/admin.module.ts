import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'app/modules/shared/shared.module';
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

@NgModule({
    declarations: [
        UserListViewComponent,
        UserEditViewComponent,
        UserCreateViewComponent,
        CourseCreateViewComponent,
        CourseListViewComponent,
        CourseEditViewComponent,
        AdminViewComponent,
        TeacherListViewComponent,
        TeacherCreateViewComponent,
        TeacherEditViewComponent,
        AudienceListViewComponent,
        AudienceCreateViewComponent,
        AudienceEditViewComponent
    ],
    imports: [
        SharedModule,
        AdminRoutingModule
    ]
})
export class AdminModule {
}
