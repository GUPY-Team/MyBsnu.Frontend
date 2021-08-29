import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EnvironmentService } from 'app/core/environment.service';
import { GroupSchedule, Schedule } from '../models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {

    private readonly baseUrl: string;

    constructor(
        private client: HttpClient,
        private environmentService: EnvironmentService
    ) {
        this.baseUrl = environmentService.getValue<string>('apiUrl', '');
    }

    public getScheduleById(scheduleId: number): Observable<Schedule> {
        return this.client.get<Schedule>(`${this.baseUrl}/schedule/${scheduleId}`);
    }

    public getScheduleList(): Observable<Schedule[]> {
        return this.client.get<Schedule[]>(`${this.baseUrl}/schedule`);
    }

    public getLatestGroupSchedule(groupId: number): Observable<GroupSchedule> {
        return this.client.get<GroupSchedule>(`${this.baseUrl}/schedule/latest`, {
            params: new HttpParams().set('groupId', groupId)
        });
    }

    public getGroupSchedule(scheduleId: number, groupId: number): Observable<GroupSchedule> {
        return this.client.get<GroupSchedule>(`${this.baseUrl}/schedule/${scheduleId}/groups/${groupId}`);
    }
}
