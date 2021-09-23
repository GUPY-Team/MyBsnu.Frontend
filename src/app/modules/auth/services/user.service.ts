import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from 'app/core/services/environment.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppUser, UserSignedInResponse } from '../models';
import { tap } from 'rxjs/operators';
import { JwtToken } from 'app/core/models/JwtToken';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly savedTokenKey = 'Token';
    private readonly baseUrl: string;

    private _user = new BehaviorSubject<AppUser | null>(null);
    private _userToken = new BehaviorSubject<JwtToken | null>(null);

    public user$ = this._user.asObservable();

    public get currentUser(): AppUser | null {
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

        this.initialize();
    }

    public signin(email: string, password: string): Observable<UserSignedInResponse> {
        return this.client.post<UserSignedInResponse>(`${this.baseUrl}/auth/signin`, { email, password })
            .pipe(
                tap(response => this.setUserFromSignInResponse(response))
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

    private initialize() {
        const savedToken = localStorage.getItem(this.savedTokenKey);
        if (savedToken !== null) {
            this.setUserFromToken(savedToken);
        }
    }

    private setUserFromSignInResponse(response: UserSignedInResponse) {
        const token = JwtToken.parse(response.token);
        this._userToken.next(token);

        this._user.next({
            email: response.email,
            userName: response.userName,
        });

        localStorage.setItem(this.savedTokenKey, token.toString());
    }

    private setUserFromToken(tokenString: string): void {
        const token = JwtToken.parse(tokenString);
        this._userToken.next(token);

        this._user.next({
            email: token.payload['email'] as string,
            userName: token.payload['userName'] as string
        });

        localStorage.setItem(this.savedTokenKey, token.toString());
    }
}
