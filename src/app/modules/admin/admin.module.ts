import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'app/modules/shared/shared.module';
import {
    UserListViewComponent,
    UserEditViewComponent,
    UserCreateViewComponent
} from './components';
import { CourseCreateViewComponent } from './components/course-create-view/course-create-view.component';


@NgModule({
    declarations: [
        UserListViewComponent,
        UserEditViewComponent,
        UserCreateViewComponent,
        CourseCreateViewComponent
    ],
    imports: [
        SharedModule,
        AdminRoutingModule
    ]
})
export class AdminModule {
}
