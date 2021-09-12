import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninViewComponent, SignupViewComponent } from './components';
import { SharedModule } from 'app/modules/shared/shared.module';


@NgModule({
    declarations: [
        SigninViewComponent,
        SignupViewComponent,
    ],
    imports: [
        AuthRoutingModule,
        SharedModule
    ]
})
export class AuthModule {
}
