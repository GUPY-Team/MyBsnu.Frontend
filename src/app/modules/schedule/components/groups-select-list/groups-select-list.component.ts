import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Group } from 'app/api/models';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'app-groups-select-list',
    templateUrl: './groups-select-list.component.html',
    styleUrls: ['./groups-select-list.component.scss']
})
export class GroupsSelectListComponent implements OnInit {


    public groupNumberControl: FormControl = new FormControl();

    public selectedGroups: Group[] = [];
    public filteredGroups$: Observable<Group[]> = of([]);


    @Input()
    public set groups(groups$: Observable<Group[]>) {
        const groups = groups$.pipe(
            map(groups => this.filterSelectedGroups(groups))
        );

        this.filteredGroups$ = this.groupNumberControl.valueChanges.pipe(
            startWith(''),
            switchMap(number => number
                ? groups.pipe(map(groups => this.filterGroupsByNumber(groups, number)))
                : groups
            )
        );
    }

    @Input()
    public groupControl!: FormControl;

    @Input()
    public error?: string;

    @ViewChild('groupInput') audienceInput!: ElementRef<HTMLInputElement>;

    public ngOnInit(): void {
        this.selectedGroups = this.groupControl.value ?? [];
    }

    public groupRemoved(group: Group) {
        this.selectedGroups = this.selectedGroups.filter(t => t.id !== group.id);
        this.updateControlValue();
    }

    public groupSelected(event: MatAutocompleteSelectedEvent) {
        this.selectedGroups.push(event.option.value);
        this.updateControlValue();

        this.groupNumberControl.setValue('');
        this.audienceInput.nativeElement.value = '';
    }

    private updateControlValue() {
        this.groupControl.setValue(this.selectedGroups);
        this.groupControl.markAsDirty();
    }

    private filterSelectedGroups(groups: Group[]): Group[] {
        const selectedGroups = new Set<number>(this.selectedGroups.map(a => a.id));
        return groups.filter(a => !selectedGroups.has(a.id));
    }

    private filterGroupsByNumber(groups: Group[], number: string): Group[] {
        return groups.filter(a => a.number.includes(number));
    }

}
