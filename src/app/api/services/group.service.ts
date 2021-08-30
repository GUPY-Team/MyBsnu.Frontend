import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from 'app/core/services/environment.service';
import { Group } from '../models';
import { Observable } from 'rxjs';

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

    public getGroups(): Observable<Group[]> {
        return this.client.get<Group[]>(`${this.baseUrl}/groups`);
    }
}
