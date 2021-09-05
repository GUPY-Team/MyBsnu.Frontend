import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

export interface Entity {
    id: number
}

@Component({
    selector: 'app-select-list',
    templateUrl: './select-list.component.html',
    styleUrls: ['./select-list.component.scss']
})
export class SelectListComponent implements OnInit {
    public autocompleteControl: FormControl = new FormControl();

    public selectedEntities: Entity[] = [];
    public filteredEntities$: Observable<Entity[]> = of([]);

    public displayEntity(entity: any): string {
        return this.displayWith
            ? this.displayWith(entity)
            : entity.toString();
    }

    @Input()
    public set entities(entities$: Observable<Entity[]>) {
        const entities = entities$.pipe(
            map(e => this.filterSelectedEntities(e))
        );

        this.filteredEntities$ = this.autocompleteControl.valueChanges.pipe(
            startWith(''),
            switchMap(val => val
                ? entities.pipe(map(e => this.filter(e, val)))
                : entities
            )
        );
    }

    @Input()
    public control!: FormControl;

    @Input()
    public filter!: (entities: any[], value: string) => any[];

    @Input()
    public displayWith?: ((value: any) => string);

    @Input()
    public title: string = '';

    @Input()
    public error?: string;

    @ViewChild('autocompleteInput') autocompleteInput!: ElementRef<HTMLInputElement>;

    public ngOnInit(): void {
        this.selectedEntities = this.control.value ?? [];
    }

    public entityRemoved(entity: Entity) {
        this.selectedEntities = this.selectedEntities.filter(t => t.id !== entity.id);
        this.updateControlValue();
    }

    public entitySelected(event: MatAutocompleteSelectedEvent) {
        this.selectedEntities.push(event.option.value);
        this.updateControlValue();

        this.autocompleteControl.setValue('');
        this.autocompleteInput.nativeElement.value = '';
    }

    private filterSelectedEntities(entities: Entity[]): Entity[] {
        const selectedEntities = new Set<number>(this.selectedEntities.map(e => e.id));
        return entities.filter(e => !selectedEntities.has(e.id));
    }

    private updateControlValue() {
        this.control.setValue(this.selectedEntities);
        this.control.markAsDirty();
    }
}
