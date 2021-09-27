import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'app/modules/shared/shared.module';
import { UserListViewComponent } from './components';


@NgModule({
    declarations: [
        UserListViewComponent
    ],
    imports: [
        SharedModule,
        AdminRoutingModule
    ]
})
export class AdminModule {
}
