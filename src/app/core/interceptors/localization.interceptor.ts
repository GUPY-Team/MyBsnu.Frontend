import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LocalizationInterceptor implements HttpInterceptor {

    constructor(
        private translationService: TranslateService
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const currentLocale = this.translationService.currentLang;
        if (currentLocale) {
            const requestAcceptLanguageHeader = request.clone({
                headers: request.headers.set('Accept-Language', currentLocale)
            });

            return next.handle(requestAcceptLanguageHeader);
        }
        return next.handle(request);
    }
}
