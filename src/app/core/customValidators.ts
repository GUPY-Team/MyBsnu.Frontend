import {
    AbstractControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn
} from '@angular/forms';

export class CustomValidators {
    static mustMatchValidator(firstControl: string, secondControl: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const first = control.get(firstControl);
            const second = control.get(secondControl);

            if (first?.value !== second?.value) {
                second?.setErrors({ mustMatch: [firstControl, secondControl] });
            } else if (second?.errors) {
                delete second?.errors['mustMatch'];
            }

            return null;
        };
    }
}

export function getErrorMessages(formGroup: FormGroup): { [key: string]: string } {
    const errorMessages: { [key: string]: string } = {};
    const controls = formGroup.controls;

    for (const controlName of Object.keys(controls)) {
        const control = controls[controlName];

        if (control.errors?.required) {
            errorMessages[controlName] = 'Field is required';
        } else if (control.errors?.email) {
            errorMessages[controlName] = 'You must provide a valid email';
        } else if (control.errors?.minlength) {
            const requiredLength = control.errors?.minlength.requiredLength;
            errorMessages[controlName] = `Minimum length is ${requiredLength}`;
        } else if (control.errors?.maxlength) {
            const requiredLength = control.errors?.maxlength.requiredLength;
            errorMessages[controlName] = `Maximum length is ${requiredLength}`;
        } else if (control.errors?.mustMatch) {
            const [first, second] = control.errors?.mustMatch;
            errorMessages[second] = `Field must match ${first}`;
        }
    }

    return errorMessages;
}
