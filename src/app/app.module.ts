import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ENVIRONMENT, HttpLoaderFactory, LoaderInterceptor, LocalizationInterceptor, MissingTranslationService } from 'app/core';
import { environment } from 'environments/environment';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from 'app/modules/auth/interceptors';
import { ErrorInterceptor } from 'app/core/interceptors/error.interceptor';
import { FooterComponent, NavbarComponent, SidenavComponent } from 'app/components';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'app/modules/shared/shared.module';
import { LocalesMenuComponent } from 'app/components/locales-menu/locales-menu.component';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';

@NgModule({
    declarations: [
        AppComponent,
        SidenavComponent,
        NavbarComponent,
        FooterComponent,
        LocalesMenuComponent,
        AccountMenuComponent,
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
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LocalizationInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
