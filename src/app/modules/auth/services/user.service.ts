import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from 'app/core/services/environment.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppUser, UserSignedInResponse } from '../models';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly baseUrl: string;

    private _user = new BehaviorSubject<AppUser | null>(null);

    public user$ = this._user.asObservable();

    public get currentUser(): AppUser | null {
        return this._user.value;
    }

    constructor(
        private client: HttpClient,
        private environmentService: EnvironmentService
    ) {
        this.baseUrl = environmentService.getValue<string>('apiUrl', '');
    }

    public signin(email: string, password: string): Observable<UserSignedInResponse> {
        return this.client.post<UserSignedInResponse>(`${this.baseUrl}/auth/signin`, { email, password })
            .pipe(
                tap(response => this._user.next(response))
            );
    }

    public signup(email: string, username: string, password: string): Observable<void> {
        return this.client.post<void>(`${this.baseUrl}/auth/signup`, { email, username, password });
    }

    public logout(): void {
        this._user.next(null);
    }
}
