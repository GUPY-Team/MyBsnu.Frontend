import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EnvironmentService, PagedList } from 'app/core';
import { Observable } from 'rxjs';
import { Audience } from 'app/api/models';
import { CreateAudienceCommand, UpdateAudienceCommand } from 'app/api/commands/AudienceCommands';

@Injectable({
    providedIn: 'root'
})
export class AudienceService {

    private readonly baseUrl: string;

    constructor(
        private client: HttpClient,
        private environmentService: EnvironmentService
    ) {
        this.baseUrl = environmentService.getValue<string>('apiUrl', '');
    }

    public getAudiences(page: number = 1, pageSize: number = 10): Observable<PagedList<Audience>> {
        return this.client.get<PagedList<Audience>>(`${this.baseUrl}/audiences`, {
            params: new HttpParams().set('page', page).set('pageSize', pageSize)
        });
    }

    public getAudience(id: number): Observable<Audience> {
        return this.client.get<Audience>(`${this.baseUrl}/audiences/${id}`);
    }

    public createAudience(command: CreateAudienceCommand): Observable<Audience> {
        return this.client.post<Audience>(`${this.baseUrl}/audiences`, command);
    }

    public updateAudience(command: UpdateAudienceCommand): Observable<Audience> {
        return this.client.put<Audience>(`${this.baseUrl}/audiences`, command);
    }

    public deleteAudience(id: number): Observable<void> {
        return this.client.delete<void>(`${this.baseUrl}/audiences/${id}`);
    }
}
