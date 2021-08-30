import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ENVIRONMENT, LoaderInterceptor } from 'app/core';
import { environment } from 'environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'app/modules/material/material.module';
import { AuthInterceptor } from 'app/modules/auth/interceptors';
import { ErrorInterceptor } from 'app/core/error.interceptor';
import {
    SidenavComponent,
    NavbarComponent,
    FooterComponent
} from 'app/components';

@NgModule({
    declarations: [
        AppComponent,
        SidenavComponent,
        NavbarComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
    ],
    providers: [
        {
            provide: ENVIRONMENT,
            useValue: environment
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
