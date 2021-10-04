import {NgModule} from '@angular/core';

import {AdminRoutingModule} from './admin-routing.module';
import {SharedModule} from 'app/modules/shared/shared.module';
import {
    CourseCreateViewComponent,
    CourseEditViewComponent,
    CourseListViewComponent,
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
        CourseEditViewComponent
    ],
    imports: [
        SharedModule,
        AdminRoutingModule
    ]
})
export class AdminModule {
}
