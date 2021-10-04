import { Component } from '@angular/core';
import { CreateViewBase } from 'app/modules/shared/models';
import { User } from 'app/modules/admin/models';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'app/modules/admin/services';

@Component({
    selector: 'app-user-create-view',
    templateUrl: './user-create-view.component.html',
    styleUrls: ['./user-create-view.component.scss']
})
export class UserCreateViewComponent extends CreateViewBase<User> {

    public form: FormGroup = this.formBuilder.group({
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
        ]
    });

    public onSubmitRedirect: any[] = ['/admin/users'];

    constructor(
        private userService: UserService,
        formBuilder: FormBuilder,
        router: Router
    ) {
        super(formBuilder, router);
    }

    public createEntity(): Observable<User> {
        return this.userService.createUser(this.form.value);
    }
}
