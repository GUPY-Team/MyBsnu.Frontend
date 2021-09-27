import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EnvironmentService, PagedList } from 'app/core';
import { Observable } from 'rxjs';
import { User, UserListModel } from '../models';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly baseUrl: string;

    constructor(
        private client: HttpClient,
        private environmentService: EnvironmentService
    ) {
        this.baseUrl = environmentService.getValue<string>('apiUrl', '');
    }

    public getUsers(page: number, pageSize: number): Observable<PagedList<UserListModel>> {
        return this.client.get<PagedList<UserListModel>>(`${this.baseUrl}/users`, {
            params: new HttpParams().set('page', page).set('pageSize', pageSize)
        });
    }

    public getUser(id: string): Observable<User> {
        return this.client.get<User>(`${this.baseUrl}/users/${id}`);
    }
}
