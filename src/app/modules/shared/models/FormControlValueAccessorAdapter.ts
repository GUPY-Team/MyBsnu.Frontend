import { AbstractControl, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';
import { Directive, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

@Directive()
export abstract class FormControlValueAccessorAdapter implements ControlValueAccessor, OnDestroy {

    protected unsubscribe = new Subject();

    public abstract control: AbstractControl;

    public onTouched: () => void = () => {
    };

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public writeValue(val: any): void {
        if (val === null) {
            this.control.reset();
        } else {
            this.control.setValue(val, { emitEvent: false });
        }
    }

    public registerOnChange(fn: any): void {
        this.control.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(fn);
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.control.disable() : this.control.enable();
    }
}
