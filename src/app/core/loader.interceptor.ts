import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalLoaderService } from 'app/core/services';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(
        private loaderService: GlobalLoaderService
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.loaderService.incrementRequestsCount();

        return next.handle(request)
            .pipe(
                finalize(() => this.loaderService.decrementRequestsCount())
            );
    }
}
