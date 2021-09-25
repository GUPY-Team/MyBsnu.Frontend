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
                catchError(({ error, status }) => {
                    if (status === 403) {
                        const message = this.translateService.instant('ERRORS.FORBIDDEN_ERROR');
                        return this.showMessageAndThrow(message, error);
                    }

                    const validationErrors = error?.errors;
                    if (validationErrors) {
                        let message = this.translateService.instant('ERRORS.VALIDATION_ERROR');

                        for (const key in Object.keys(validationErrors)) {
                            message += `${validationErrors[key].join('\n')}\n`;
                        }

                        return this.showMessageAndThrow(message, error);
                    }

                    const message = error?.message ?? this.translateService.instant('ERRORS.UNEXPECTED_ERROR');
                    return this.showMessageAndThrow(message, error);
                })
            );
    }

    private showMessageAndThrow(message: string, error: any): Observable<never> {
        this.snackBar.open(message, '', {
            panelClass: 'snackbar-warn'
        });

        return throwError(error);
    }
}
