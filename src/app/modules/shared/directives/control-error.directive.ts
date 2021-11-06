/*
import { ComponentFactoryResolver, ComponentRef, Directive, Host, OnDestroy, OnInit, Optional, Self, ViewContainerRef } from '@angular/core';
import { FormGroupDirective, NgControl, ValidationErrors } from '@angular/forms';
import { EMPTY, merge, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatError } from '@angular/material/form-field';
import { TranslateService } from '@ngx-translate/core';


interface ControlError {
    code: string;
    params: { [key: string]: any }
}

@Directive({
    selector: '[formControl], [formControlName]'
})
export class ControlErrorDirective implements OnInit, OnDestroy {

    private unsubscribe = new Subject();

    private matErrorRef: ComponentRef<MatError> | null = null;

    private formSubmit$: Observable<any>;
    private controlValueChanges$: Observable<any>;

    constructor(
        @Self() private control: NgControl,
        @Optional() @Host() private form: FormGroupDirective,
        private resolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private translateService: TranslateService
    ) {
        this.formSubmit$ = this.form?.statusChanges ?? EMPTY;
        this.controlValueChanges$ = this.control.valueChanges!;
    }

    public ngOnInit(): void {
        merge([
            this.formSubmit$,
            this.controlValueChanges$
        ]).pipe(
            takeUntil(this.unsubscribe)
        ).subscribe(() => {
            const errors = this.control.errors;
            if (errors) {
                const { code, params } = this.convertToControlError(errors);
                const errorText = this.translateService.instant(code, params);
                this.setErrorText(errorText);
            } else if (this.matErrorRef) {
                this.setErrorText('');
            }
        });
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    private convertToControlError(errors: ValidationErrors): ControlError {
        const [code, params] = Object.entries(errors)[0];
        return { code: `FORM_ERRORS.${code.toUpperCase()}`, params };
    }

    private setErrorText(text: string): void {
        if (!this.matErrorRef) {
            const factory = this.resolver.resolveComponentFactory(MatError);
            this.matErrorRef = this.viewContainerRef.createComponent(factory);
        }

        this.matErrorRef.location.nativeElement.innerText = text;
    }
}
*/
