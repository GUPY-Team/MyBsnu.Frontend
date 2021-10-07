import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EnvironmentService } from 'app/core/services/environment.service';
import { Group } from '../models';
import { Observable } from 'rxjs';
import { CreateGroupCommand, EditGroupCommand } from 'app/api/commands';
import { PagedList } from 'app/core';

@Injectable({
    providedIn: 'root'
})
export class GroupService {

    private readonly baseUrl: string;

    constructor(
        private client: HttpClient,
        private environmentService: EnvironmentService
    ) {
        this.baseUrl = environmentService.getValue<string>('apiUrl', '');
    }

    public getGroups(page: number = 1, pageSize: number = 10): Observable<PagedList<Group>> {
        return this.client.get<PagedList<Group>>(`${this.baseUrl}/groups`, {
            params: new HttpParams().set('page', page).set('pageSize', pageSize)
        });
    }

    public getGroup(id: number): Observable<Group> {
        return this.client.get<Group>(`${this.baseUrl}/groups/${id}`);
    }

    public createGroup(command: CreateGroupCommand): Observable<Group> {
        return this.client.post<Group>(`${this.baseUrl}/groups`, command);
    }

    public editGroup(command: EditGroupCommand): Observable<Group> {
        return this.client.put<Group>(`${this.baseUrl}/groups`, command);
    }

    public deleteGroup(id: number): Observable<void> {
        return this.client.delete<void>(`${this.baseUrl}/groups/${id}`);
    }
}
