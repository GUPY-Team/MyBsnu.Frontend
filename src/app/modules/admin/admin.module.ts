import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'app/modules/shared/shared.module';
import {
    UserListViewComponent,
    UserEditViewComponent,
    UserCreateViewComponent
} from './components';


@NgModule({
    declarations: [
        UserListViewComponent,
        UserEditViewComponent,
        UserCreateViewComponent
    ],
    imports: [
        SharedModule,
        AdminRoutingModule
    ]
})
export class AdminModule {
}
