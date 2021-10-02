import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Audience, Group, Teacher } from 'app/api/models';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-class-info',
    templateUrl: './class-info.component.html',
    styleUrls: ['./class-info.component.scss'],
})
export class ClassInfoComponent {

    @Input()
    public group!: FormGroup;

    @Input()
    public teachers!: Observable<Teacher[]>;

    @Input()
    public audiences!: Observable<Audience[]>;

    @Input()
    public groups!: Observable<Group[]>;

    public filterTeachers(teachers: Teacher[], value: string): Teacher[] {
        return teachers.filter(t => t.fullName.toLowerCase().includes(value.toLowerCase()));
    }

    public displayTeacher(teacher: Teacher): string {
        return teacher.shortName;
    }

    public filterAudiences(audiences: Audience[], value: string): Audience[] {
        return audiences.filter(a => a.fullNumber.includes(value));
    }

    public displayAudience(audience: Audience): string {
        return audience.fullNumber;
    }

    public filterGroups(groups: Group[], value: string): Group[] {
        return groups.filter(a => a.number.includes(value));
    }

    public displayGroup(group: Group): string {
        return group.number;
    }
}
