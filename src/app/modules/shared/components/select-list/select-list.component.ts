import { Component, ElementRef, Input, Self, ViewChild } from '@angular/core';
import { FormControl, NgControl, } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControlValueAccessorAdapter } from 'app/modules/shared/models';
import { compareEntities } from 'app/core';

@Component({
    selector: 'app-select-list',
    templateUrl: './select-list.component.html',
    styleUrls: ['./select-list.component.scss'],
})
export class SelectListComponent extends FormControlValueAccessorAdapter {

    public control: FormControl = new FormControl([]);

    public autocompleteControl: FormControl = new FormControl();

    public filteredItems$!: Observable<any[]>;

    @Input()
    public set items(items$: Observable<any[]>) {
        const items = items$.pipe(
            shareReplay(),
            map(i => this.filterSelectedItems(i))
        );

        this.filteredItems$ = this.autocompleteControl.valueChanges.pipe(
            startWith(''),
            switchMap(val => val
                ? items.pipe(map(i => this.filter(i, val.toString())))
                : items
            )
        );
    }

    @Input()
    public filter!: (entities: any[], value: string) => any[];

    @Input()
    public displayWith?: ((value: any) => string);

    @Input()
    public compareWith: (o1: any, o2: any) => boolean = compareEntities;

    @Input()
    public title: string = '';

    @ViewChild('autocompleteInput') autocompleteInput!: ElementRef<HTMLInputElement>;

    constructor(@Self() public controlDir: NgControl) {
        super();
        this.controlDir.valueAccessor = this;
    }

    public writeValue(val: any) {
        if (val === null) {
            this.control.setValue([], { emitEvent: false });
        } else {
            this.control.setValue(val, { emitEvent: false });
        }
    }

    public itemRemoved(item: any) {
        this.control.setValue(this.control.value.filter((i: any) => !this.compareWith(i, item)));
        this.autocompleteControl.updateValueAndValidity();
    }

    public itemSelected(event: MatAutocompleteSelectedEvent) {
        this.control.setValue([...this.control.value, event.option.value]);
        this.autocompleteControl.setValue('');
        this.autocompleteInput.nativeElement.value = '';
    }

    public displayItem(item: any): string {
        return this.displayWith
            ? this.displayWith(item)
            : item.toString();
    }

    private filterSelectedItems(items: any[]): any[] {
        const selectedItems = this.control.value;
        return items.reduce(
            (prev, curr) => selectedItems.some((i: any) => this.compareWith(i, curr)) ? prev : [...prev, curr]
            , []
        );
    }
}
