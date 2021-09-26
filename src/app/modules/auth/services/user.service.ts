import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from 'app/core/services/environment.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppUser, UserSignedInResponse } from '../models';
import { tap } from 'rxjs/operators';
import { JwtToken } from 'app/core/models/JwtToken';
import { Router } from '@angular/router';
import { Permission } from 'app/api/models/Permission';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly savedTokenKey = 'Token';
    private readonly baseUrl: string;

    private _user = new BehaviorSubject<AppUser | null>(null);
    private _userToken = new BehaviorSubject<JwtToken | null>(null);

    public user$ = this._user.asObservable();

    public get user(): AppUser | null {
        return this._user.value;
    }

    public get authToken(): JwtToken | null {
        return this._userToken.value;
    }

    constructor(
        private client: HttpClient,
        private router: Router,
        private environmentService: EnvironmentService
    ) {
        this.baseUrl = environmentService.getValue<string>('apiUrl', '');

        this.initFromSavedState();
    }

    public signin(email: string, password: string): Observable<UserSignedInResponse> {
        return this.client.post<UserSignedInResponse>(`${this.baseUrl}/auth/signin`, { email, password })
            .pipe(
                tap(response => this.setAndSaveState(JwtToken.parse(response.token)))
            );
    }

    public signup(email: string, username: string, password: string): Observable<void> {
        return this.client.post<void>(`${this.baseUrl}/auth/signup`, { email, username, password });
    }

    public logout(): void {
        this._user.next(null);
        this._userToken.next(null);

        localStorage.removeItem(this.savedTokenKey);

        this.router.navigate(['/']);
    }

    private initFromSavedState() {
        const savedToken = localStorage.getItem(this.savedTokenKey);
        if (savedToken !== null) {
            this.setAndSaveState(JwtToken.parse(savedToken));
        }
    }

    private setAndSaveState(token: JwtToken) {
        const user = new AppUser(
            token.payload.userName,
            token.payload.email,
            (Array.isArray(token.payload.permission)
                ? token.payload.permission
                : [token.payload.permission]) as Permission[]);

        this._user.next(user);
        this._userToken.next(token);

        localStorage.setItem(this.savedTokenKey, token.toString());
    }
}
