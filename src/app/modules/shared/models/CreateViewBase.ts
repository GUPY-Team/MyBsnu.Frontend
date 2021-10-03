import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({ template: '' })
export abstract class CreateViewBase<T> implements OnDestroy {

    private _unsubscribe = new Subject();
    private _requestPending = new BehaviorSubject(false);

    public abstract form: FormGroup;
    public abstract onSubmitRedirect: any[];

    public submitDisabled$ = this._requestPending;

    protected constructor(
        protected formBuilder: FormBuilder,
        protected router: Router
    ) {
    }

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }

    public onSubmit(): void {
        if (!this.form.valid) {
            return;
        }

        this._requestPending.next(true);

        this.createEntity()
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(
                _ => this.router.navigate(this.onSubmitRedirect),
                _ => this._requestPending.next(false)
            );
    }

    public abstract createEntity(): Observable<T>;
}
