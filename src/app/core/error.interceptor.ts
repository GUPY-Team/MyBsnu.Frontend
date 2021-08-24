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
                catchError(({ error }) => {
                    let message;

                    const validationErrors = error.errors;
                    if (validationErrors) {
                        message = 'Validation error happened:\n';
                        for (const key in validationErrors) {
                            message += `${validationErrors[key].join('\n')}\n`;
                        }
                    } else {
                        message = error.message ?? 'Unexpected error happened';
                    }

                    this.snackBar.open(message, '', {
                        panelClass: 'snackbar-warn'
                    });

                    return throwError(error);
                })
            );
    }
}
