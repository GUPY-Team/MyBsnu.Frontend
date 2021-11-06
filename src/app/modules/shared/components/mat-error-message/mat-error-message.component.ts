import { AfterViewInit, Component, Injector, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { takeUntil } from 'rxjs/operators';
import { ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

interface ControlError {
    code: string;
    params: { [key: string]: any }
}

@Component({
    selector: '[matErrorMessage]',
    templateUrl: './mat-error-message.component.html',
    styleUrls: ['./mat-error-message.component.scss']
})
export class MatErrorMessageComponent implements AfterViewInit, OnDestroy {

    private unsubscribe = new Subject();

    private inputRef!: MatFormFieldControl<MatInput>;

    private error = new BehaviorSubject('');

    public error$: Observable<string> = this.error.asObservable();

    constructor(
        private injector: Injector,
        private translateService: TranslateService
    ) {
    }

    public ngAfterViewInit(): void {
        this.inputRef = this.injector.get(MatFormField)._control;
        this.inputRef.ngControl?.statusChanges?.pipe(
            takeUntil(this.unsubscribe)
        ).subscribe(() => this.updateError())
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    private updateError(): void {
        const errors = this.inputRef.ngControl?.errors;
        if (errors) {
            const { code, params } = this.convertToControlError(errors);
            const errorText = this.translateService.instant(code, params);
            this.error.next(errorText);
        }
    }

    private convertToControlError(errors: ValidationErrors): ControlError {
        const [code, params] = Object.entries(errors)[0];
        return { code: `FORM_ERRORS.${code.toUpperCase()}`, params };
    }
}
