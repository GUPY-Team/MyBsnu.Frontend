import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninViewComponent, SignupViewComponent } from './components';

const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: SigninViewComponent },
    { path: 'signup', component: SignupViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
