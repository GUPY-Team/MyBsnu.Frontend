import { AfterViewChecked, Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroupDirective, ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

interface FormError {
    code: string;
    params?: { [key: string]: string | number }
}

@Directive({
    selector: '[appFormError]'
})
export class FormErrorDirective implements OnInit, AfterViewChecked {

    private control!: AbstractControl;

    @Input()
    public controlName!: string;

    constructor(
        private groupDir: FormGroupDirective,
        private el: ElementRef,
        private translateService: TranslateService
    ) {
    }

    public ngOnInit(): void {
        const control = this.groupDir.form.get(this.controlName);
        if (control === null) {
            throw new Error(`Can't find control with name ${this.controlName} in formGroup`);
        }

        this.control = control;
    }

    public ngAfterViewChecked(): void {
        const errors = this.control.errors;
        if (errors === null) {
            return;
        }

        const error = this.convertToFormError(errors);
        this.el.nativeElement.innerText = this.translateService.instant(error.code, error.params);
    }

    private convertToFormError(errors: ValidationErrors): FormError {
        const [code, params] = Object.entries(errors)[0];
        return { code: `FORM_ERRORS.${code.toUpperCase()}`, params };
    }
}
