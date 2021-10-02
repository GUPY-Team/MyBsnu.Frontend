import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EnvironmentService } from 'app/core';
import { Observable } from 'rxjs';
import { Audience, Group, Teacher, WeekDay, WeekType } from 'app/api/models';

export interface GetIdleEntityQuery {
    scheduleId: number;
    weekDay: WeekDay;
    weekType?: WeekType;
    startTime: string;
}

@Injectable({
    providedIn: 'root'
})
export class DesignerAutocompleteService {

    private readonly baseUrl: string;

    constructor(
        private client: HttpClient,
        private environmentService: EnvironmentService
    ) {
        this.baseUrl = environmentService.getValue<string>('apiUrl', '');
    }

    public getIdleTeachers(query: GetIdleEntityQuery): Observable<Teacher[]> {
        return this.client.get<Teacher[]>(`${this.baseUrl}/designerAutocomplete/idleTeachers`, {
            params: this.getParams(query)
        });
    }

    public getIdleAudiences(query: GetIdleEntityQuery): Observable<Audience[]> {
        return this.client.get<Audience[]>(`${this.baseUrl}/designerAutocomplete/idleAudiences`, {
            params: this.getParams(query)
        });
    }

    public getIdleGroups(query: GetIdleEntityQuery): Observable<Group[]> {
        return this.client.get<Group[]>(`${this.baseUrl}/designerAutocomplete/idleGroups`, {
            params: this.getParams(query)
        });
    }

    private getParams(query: GetIdleEntityQuery): HttpParams {
        let params = new HttpParams()
            .set('scheduleId', query.scheduleId)
            .set('weekDay', query.weekDay)
            .set('startTime', query.startTime);

        if (query.weekType != null) {
            params = params.set('weekType', query.weekType);
        }

        return params;
    }
}
