import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from 'app/core';
import { Observable } from 'rxjs';
import { Claim } from '../models';

@Injectable({
    providedIn: 'root'
})
export class ClaimService {

    private readonly baseUrl: string;

    constructor(
        private client: HttpClient,
        private environmentService: EnvironmentService
    ) {
        this.baseUrl = environmentService.getValue<string>('apiUrl', '');
    }

    public getClaims(): Observable<Claim[]> {
        return this.client.get<Claim[]>(`${this.baseUrl}/claims`);
    }
}
