import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ENVIRONMENT, HttpLoaderFactory, LoaderInterceptor, MissingTranslationService } from 'app/core';
import { environment } from 'environments/environment';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from 'app/modules/auth/interceptors';
import { ErrorInterceptor } from 'app/core/error.interceptor';
import {
    SidenavComponent,
    NavbarComponent,
    FooterComponent
} from 'app/components';
import {
    MissingTranslationHandler,
    TranslateLoader,
    TranslateModule
} from '@ngx-translate/core';
import { SharedModule } from 'app/modules/shared/shared.module';
import { SettingsMenuComponent } from './components/settings-menu/settings-menu.component';

@NgModule({
    declarations: [
        AppComponent,
        SidenavComponent,
        NavbarComponent,
        FooterComponent,
        SettingsMenuComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissingTranslationService },
        })
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
