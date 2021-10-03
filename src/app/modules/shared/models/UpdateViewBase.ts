import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'app/modules/shared/components';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ template: '' })
export abstract class UpdateViewBase<T> implements OnInit, OnDestroy {

    protected unsubscribe = new Subject();

    private _requestPending = new BehaviorSubject(false);
    private _formPristine = new BehaviorSubject(false);

    public abstract form: FormGroup;
    public abstract onDeleteRedirect: any[];

    public saveDisabled$: Observable<boolean>;
    public deleteDisabled$: Observable<boolean>;

    protected constructor(
        protected formBuilder: FormBuilder,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected dialog: MatDialog
    ) {
        this.saveDisabled$ = combineLatest([this._requestPending, this._formPristine]).pipe(
            map(([a, b]) => a || b)
        );
        this.deleteDisabled$ = this._requestPending.asObservable();
    }

    public ngOnInit(): void {
        this.form.valueChanges
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(_ => this._formPristine.next(false));
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public onUpdate() {
        if (!this.form.valid) {
            return;
        }

        this._requestPending.next(true);

        this.updateEntity()
            .pipe(
                takeUntil(this.unsubscribe),
                finalize(() => {
                    this._requestPending.next(false);
                    this._formPristine.next(true);
                })
            )
            .subscribe(r => {
                this.form.patchValue(r);
            });
    }

    public onDelete() {
        this.dialog.open(ConfirmDialogComponent, {
            width: '500px'
        }).afterClosed().pipe(
            filter(result => result === true),
            tap(_ => this._requestPending.next(true)),
            switchMap(_ => this.deleteEntity()),
            finalize(() => this._requestPending.next(false)),
            tap(_ => this.router.navigate(this.onDeleteRedirect)),
            takeUntil(this.unsubscribe)
        ).subscribe();
    }

    public abstract updateEntity(): Observable<T>;

    public abstract deleteEntity(): Observable<void>;
}
