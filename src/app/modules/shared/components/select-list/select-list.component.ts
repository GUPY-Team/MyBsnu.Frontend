import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import {
    FormControl,
    NgControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControlValueAccessorAdapter } from 'app/modules/shared/models';

export interface Item {
    id: number
}

@Component({
    selector: 'app-select-list',
    templateUrl: './select-list.component.html',
    styleUrls: ['./select-list.component.scss'],
})
export class SelectListComponent extends FormControlValueAccessorAdapter implements OnInit {

    public control: FormControl = new FormControl([]);

    public autocompleteControl: FormControl = new FormControl();

    public filteredItems$!: Observable<Item[]>;

    @Input()
    public set items(items$: Observable<Item[]>) {
        const items = items$.pipe(
            shareReplay(),
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

    @ViewChild('autocompleteInput') autocompleteInput!: ElementRef<HTMLInputElement>;

    constructor(@Self() public controlDir: NgControl) {
        super();
        this.controlDir.valueAccessor = this;
    }

    public ngOnInit(): void {
        const validators = this.controlDir?.control?.validator;
        if (validators) {
            this.control.setValidators(validators);
        }
    }

    public itemRemoved(item: Item) {
        this.control.setValue(this.control.value.filter((i: Item) => i.id !== item.id));
        this.autocompleteControl.updateValueAndValidity(); // trigger value changes to display autocomplete list correctly
    }

    public itemSelected(event: MatAutocompleteSelectedEvent) {
        this.control.setValue([...this.control.value ?? [], event.option.value]);
        this.autocompleteControl.setValue('');
        this.autocompleteInput.nativeElement.value = '';
    }

    public displayItem(item: any): string {
        return this.displayWith
            ? this.displayWith(item)
            : item.toString();
    }

    private filterSelectedItems(items: Item[]): Item[] {
        const value = this.control.value ?? [];
        const selectedEntities = new Set<number>(value.map((e: Item) => e.id));
        return items.filter(e => !selectedEntities.has(e.id));
    }
}
