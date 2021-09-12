import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'app/modules/auth/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getErrorMessages } from 'app/core';

@Component({
    selector: 'app-login-view',
    templateUrl: './singin-view.component.html',
    styleUrls: ['./signin-view.component.scss']
})
export class SigninViewComponent implements OnDestroy {

    private unsubscribe = new Subject();

    public signinForm = this.formBuilder.group({
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required]]
    });

    public get errors() {
        return getErrorMessages(this.signinForm);
    }

    public submitDisabled = false;

    constructor(
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private userService: UserService,
        private router: Router,
    ) {
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public onSubmit(): void {
        if (!this.signinForm.valid) {
            return;
        }

        const values = this.signinForm.value;

        this.submitDisabled = true;
        this.userService.signin(values.email, values.password)
            .pipe(
                takeUntil(this.unsubscribe),
            )
            .subscribe(
                _ => this.router.navigate(['/group-schedule']),
                _ => this.submitDisabled = false
            );
    }
}
