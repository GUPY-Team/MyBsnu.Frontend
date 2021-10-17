import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUserService } from '../services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private userService: AppUserService
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.userService.authToken;

        if (token?.hasExpired) {
            this.userService.logout();
        }

        if (token) {
            const requestWithJwt = request.clone({
                headers: request.headers.append('Authorization', `Bearer ${token}`)
            });

            return next.handle(requestWithJwt);
        }

        return next.handle(request);
    }
}
