import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EnvironmentService } from 'app/core/services/environment.service';
import { GroupSchedule, Schedule } from '../models';
import { Observable } from 'rxjs';
import { UpdateScheduleCommand } from 'app/api/commands';

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
        return this.client.get<GroupSchedule>(`${this.baseUrl}/groupSchedule/latest`, {
            params: new HttpParams().set('groupId', groupId)
        });
    }

    public getGroupSchedule(scheduleId: number, groupId: number): Observable<GroupSchedule> {
        return this.client.get<GroupSchedule>(`${this.baseUrl}/groupSchedule/${scheduleId}`, {
            params: new HttpParams().set('groupId', groupId)
        });
    }

    public updateSchedule(command: UpdateScheduleCommand): Observable<Schedule> {
        return this.client.put<Schedule>(`${this.baseUrl}/schedule`, command);
    }

    public copySchedule(scheduleId: number): Observable<void> {
        return this.client.post<void>(`${this.baseUrl}/schedule`, {}, {
            params: new HttpParams().set('sourceId', scheduleId)
        });
    }

    public deleteSchedule(scheduleId: number): Observable<void> {
        return this.client.delete<void>(`${this.baseUrl}/schedule/${scheduleId}`);
    }
}
