import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService: UserService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.userService.currentUser?.token;

        if (token) {
            const requestWithJwt = request.clone({
                headers: request.headers.append('Authentication', `Bearer ${token}`)
            });

            return next.handle(requestWithJwt);
        } else {
            return next.handle(request);
        }
    }
}
