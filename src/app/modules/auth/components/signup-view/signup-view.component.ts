import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/modules/auth/services';
import { Router } from '@angular/router';
import { CustomValidators, getErrorMessages } from 'app/core/customValidators';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-signup-view',
    templateUrl: './signup-view.component.html',
    styleUrls: ['./signup-view.component.scss']
})
export class SignupViewComponent implements OnDestroy {

    private unsubscribe = new Subject();

    public signupForm = this.formBuilder.group({
        email: ['', [
            Validators.email,
            Validators.required]
        ],
        username: ['', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(64)]
        ],
        password: ['', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(256)]
        ],
        passwordConfirm: ['', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(256)
        ]],
    }, { validators: CustomValidators.mustMatchValidator('password', 'passwordConfirm') });

    public get errors() {
        return getErrorMessages(this.signupForm);
    }

    public submitDisabled = false;

    constructor(
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private userService: UserService,
        private router: Router
    ) {
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public onSubmit(): void {
        if (!this.signupForm.valid) {
            return;
        }

        const values = this.signupForm.value;

        this.submitDisabled = true;
        this.userService.signup(values.email, values.username, values.password)
            .pipe(
                takeUntil(this.unsubscribe),
            )
            .subscribe(
                _ => {
                    this.router.navigate(['/auth/signin']);
                    this.snackBar.open('You have been successfully registered', '', {
                        panelClass: 'snackbar'
                    });
                },
                _ => this.submitDisabled = false
            );
    }
}
