import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Audience } from 'app/api/models';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'app-audiences-select-list',
    templateUrl: './audiences-select-list.component.html',
    styleUrls: ['./audiences-select-list.component.scss']
})
export class AudiencesSelectListComponent implements OnInit {

    public audienceNumberControl: FormControl = new FormControl();

    public selectedAudiences: Audience[] = [];
    public filteredAudiences$: Observable<Audience[]> = of([]);


    @Input()
    public set audiences(audiences$: Observable<Audience[]>) {
        const audiences = audiences$.pipe(
            map(audiences => this.filterSelectedAudiences(audiences))
        );

        this.filteredAudiences$ = this.audienceNumberControl.valueChanges.pipe(
            startWith(''),
            switchMap(number => number
                ? audiences.pipe(map(audiences => this.filterAudiencesByNumber(audiences, number)))
                : audiences
            )
        );
    }

    @Input()
    public audienceControl!: FormControl;

    @Input()
    public error?: string;

    @ViewChild('audienceInput') audienceInput!: ElementRef<HTMLInputElement>;

    public ngOnInit(): void {
        this.selectedAudiences = this.audienceControl.value ?? [];
    }

    public audienceRemoved(audience: Audience) {
        this.selectedAudiences = this.selectedAudiences.filter(t => t.id !== audience.id);
        this.updateControlValue();
    }

    public audienceSelected(event: MatAutocompleteSelectedEvent) {
        this.selectedAudiences.push(event.option.value);
        this.updateControlValue();

        this.audienceNumberControl.setValue('');
        this.audienceInput.nativeElement.value = '';
    }

    private updateControlValue() {
        this.audienceControl.setValue(this.selectedAudiences);
        this.audienceControl.markAsDirty();
    }

    private filterSelectedAudiences(audiences: Audience[]): Audience[] {
        const selectedAudiences = new Set<number>(this.selectedAudiences.map(a => a.id));
        return audiences.filter(a => !selectedAudiences.has(a.id));
    }

    private filterAudiencesByNumber(audiences: Audience[], number: string): Audience[] {
        return audiences.filter(a => a.fullNumber.includes(number));
    }

}
