import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private snackBar: MatSnackBar,
        private translateService: TranslateService
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError(({ error }) => {
                    let message;

                    const validationErrors = error?.errors;
                    if (validationErrors) {
                        message = this.translateService.instant('ERRORS.VALIDATION_ERROR');
                        for (const key in Object.keys(validationErrors)) {
                            message += `${validationErrors[key].join('\n')}\n`;
                        }
                    } else {
                        message = error?.message ?? this.translateService.instant('ERRORS.UNEXPECTED_ERROR');
                    }

                    this.snackBar.open(message, '', {
                        panelClass: 'snackbar-warn'
                    });

                    return throwError(error);
                })
            );
    }
}
