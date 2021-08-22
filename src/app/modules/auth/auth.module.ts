import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from 'app/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninViewComponent, SignupViewComponent } from './components';


@NgModule({
    declarations: [
        SigninViewComponent,
        SignupViewComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class AuthModule {
}
