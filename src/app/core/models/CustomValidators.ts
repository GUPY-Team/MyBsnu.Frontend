import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn
} from '@angular/forms';

export class CustomValidators {
    static mustMatchValidator(firstControl: string, secondControl: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const first = control.get(firstControl);
            const second = control.get(secondControl);

            if (first?.value !== second?.value) {
                second?.setErrors({ mustMatch: { control: firstControl } });
            } else if (second?.errors) {
                delete second?.errors['mustMatch'];
            }

            return null;
        };
    }

    static isInEnumValidator<T extends string, TEnumValue extends string>(enumVariable: { [key in T]: TEnumValue }): ValidatorFn {
        const enumValues = Object.values(enumVariable);

        return (control: AbstractControl): ValidationErrors | null => {
            const isValid = enumValues.includes(control.value);
            return isValid ? null : { isInEnum: true };
        };
    }
}
