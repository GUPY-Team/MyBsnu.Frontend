import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Teacher } from 'app/api/models';
import { map, startWith, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'app-teachers-select-list',
    templateUrl: './teachers-select-list.component.html',
    styleUrls: ['./teachers-select-list.component.scss']
})
export class TeachersSelectListComponent implements OnInit {

    public teacherNameControl: FormControl = new FormControl();

    public selectedTeachers: Teacher[] = [];
    public filteredTeachers$: Observable<Teacher[]> = of([]);


    @Input()
    public set teachers(teachers$: Observable<Teacher[]>) {
        const teachers = teachers$.pipe(
            map(teachers => this.filterSelectedTeachers(teachers))
        );

        this.filteredTeachers$ = this.teacherNameControl.valueChanges.pipe(
            startWith(''),
            switchMap(name => name
                ? teachers.pipe(map(teachers => this.filterTeachersByName(teachers, name)))
                : teachers
            )
        );
    }

    @Input()
    public teacherControl!: FormControl;

    @Input()
    public error?: string;

    @ViewChild('teachersInput') teachersInput!: ElementRef<HTMLInputElement>;

    public ngOnInit(): void {
        this.selectedTeachers = this.teacherControl.value ?? [];
    }

    public teacherRemoved(teacher: Teacher) {
        this.selectedTeachers = this.selectedTeachers.filter(t => t.id !== teacher.id);
        this.updateControlValue();
    }

    public teacherSelected(event: MatAutocompleteSelectedEvent) {
        this.selectedTeachers.push(event.option.value);
        this.updateControlValue();

        this.teacherNameControl.setValue('');
        this.teachersInput.nativeElement.value = '';
    }

    private updateControlValue() {
        this.teacherControl.setValue(this.selectedTeachers);
        this.teacherControl.markAsDirty();
    }

    private filterSelectedTeachers(teachers: Teacher[]): Teacher[] {
        const selectedTeachers = new Set<number>(this.selectedTeachers.map(t => t.id));
        return teachers.filter(t => !selectedTeachers.has(t.id));
    }

    private filterTeachersByName(teachers: Teacher[], name: string): Teacher[] {
        return teachers.filter(t => t.fullName.includes(name));
    }
}
