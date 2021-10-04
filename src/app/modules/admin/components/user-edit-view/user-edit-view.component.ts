import { Component } from '@angular/core';
import { UpdateViewBase } from 'app/modules/shared/models';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClaimService, UserService } from 'app/modules/admin/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Claim, User } from 'app/modules/admin/models';
import { UpdateUserClaimsCommand } from 'app/api/commands';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-user-edit-view',
    templateUrl: './user-edit-view.component.html',
    styleUrls: ['./user-edit-view.component.scss']
})
export class UserEditViewComponent extends UpdateViewBase<User | void> {

    private readonly userId: string;

    public claims$: Observable<Claim[]>;

    public form: FormGroup = this.formBuilder.group({
        id: [{ value: '', disabled: true }],
        email: [{ value: '', disabled: true }],
        userName: [{ value: '', disabled: true }],
        claims: [[]]
    });

    public onDeleteRedirect: any[] = ['admin/users'];

    constructor(
        private userService: UserService,
        private claimService: ClaimService,
        formBuilder: FormBuilder,
        router: Router,
        activatedRoute: ActivatedRoute,
        dialog: MatDialog
    ) {
        super(formBuilder, router, activatedRoute, dialog);

        this.userId = this.activatedRoute.snapshot.paramMap.get('id')!;
        this.claims$ = this.claimService.getClaims();
    }

    public getEntity(): Observable<User> {
        return this.userService.getUser(this.userId);
    }

    public deleteEntity(): Observable<void> {
        return this.userService.deleteUser(this.userId);
    }

    public updateEntity(): Observable<void> {
        const command: UpdateUserClaimsCommand = {
            userId: this.userId,
            claims: this.form.value.claims
        };

        return this.userService.updateUserClaims(command).pipe(
            switchMap(_ => of<void>())
        );
    }

    public filterClaims(claims: Claim[], value: string): Claim[] {
        return claims.filter(c => c.value.toLowerCase().includes(value));
    }

    public displayClaim(claim: Claim): string {
        return `${claim.type}.${claim.value}`;
    }

    public compareClaims(c1: Claim, c2: Claim): boolean {
        return c1.value === c2.value;
    }
}
