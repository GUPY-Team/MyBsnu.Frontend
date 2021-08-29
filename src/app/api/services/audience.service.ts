import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from 'app/core';
import { Observable } from 'rxjs';
import { Audience } from 'app/api/models';

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

    public getAudiences(): Observable<Audience[]> {
        return this.client.get<Audience[]>(`${this.baseUrl}/audiences`);
    }
}
