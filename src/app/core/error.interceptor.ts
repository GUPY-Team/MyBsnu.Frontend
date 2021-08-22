import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private snackBar: MatSnackBar
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    const error = err.error;

                    this.snackBar.open(error.message, '', {
                        panelClass: 'snackbar-warn'
                    });

                    return throwError(err);
                })
            );
    }
}
