import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

export interface Item {
    id: number
}

@Component({
    selector: 'app-select-list',
    templateUrl: './select-list.component.html',
    styleUrls: ['./select-list.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: SelectListComponent
        }
    ]
})
export class SelectListComponent implements ControlValueAccessor {

    public onChange = (items: Item[]) => {
    };

    public onTouched = () => {
    };

    public touched = false;

    public disabled = false;

    public autocompleteControl: FormControl = new FormControl();

    public selectedItems: Item[] = [];
    public filteredItems$: Observable<Item[]> = of([]);

    @Input()
    public set items(items$: Observable<Item[]>) {
        const items = items$.pipe(
            map(i => this.filterSelectedItems(i))
        );

        this.filteredItems$ = this.autocompleteControl.valueChanges.pipe(
            startWith(''),
            switchMap(val => val
                ? items.pipe(map(i => this.filter(i, val)))
                : items
            )
        );
    }

    @Input()
    public filter!: (entities: any[], value: string) => any[];

    @Input()
    public displayWith?: ((value: any) => string);

    @Input()
    public title: string = '';

    @Input()
    public error?: string;

    @ViewChild('autocompleteInput') autocompleteInput!: ElementRef<HTMLInputElement>;

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public writeValue(selectedItems: Item[]): void {
        this.selectedItems = selectedItems ?? [];
    }

    public itemRemoved(item: Item) {
        this.markAsTouched();
        this.selectedItems = this.selectedItems.filter(i => i.id !== item.id);
        this.onChange(this.selectedItems);
    }

    public itemSelected(event: MatAutocompleteSelectedEvent) {
        this.markAsTouched();
        this.selectedItems.push(event.option.value);
        this.onChange(this.selectedItems);

        this.autocompleteControl.setValue('');
        this.autocompleteInput.nativeElement.value = '';
    }

    public displayItem(item: any): string {
        return this.displayWith
            ? this.displayWith(item)
            : item.toString();
    }

    private filterSelectedItems(items: Item[]): Item[] {
        const selectedEntities = new Set<number>(this.selectedItems.map(e => e.id));
        return items.filter(e => !selectedEntities.has(e.id));
    }

    private markAsTouched() {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }
}
