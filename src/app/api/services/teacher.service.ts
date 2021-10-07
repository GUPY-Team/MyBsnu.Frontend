import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EnvironmentService } from 'app/core/services/environment.service';
import { Teacher } from 'app/api/models';
import { Observable } from 'rxjs';
import { CreateTeacherCommand, UpdateTeacherCommand } from 'app/api/commands';
import { PagedList } from 'app/core';

@Injectable({
    providedIn: 'root'
})
export class TeacherService {

    private readonly baseUrl: string;

    constructor(
        private client: HttpClient,
        private environmentService: EnvironmentService
    ) {
        this.baseUrl = environmentService.getValue<string>('apiUrl', '');
    }

    public getTeachers(page: number = 1, pageSize: number = 10): Observable<PagedList<Teacher>> {
        return this.client.get<PagedList<Teacher>>(`${this.baseUrl}/teachers`, {
            params: new HttpParams().set('page', page).set('pageSize', pageSize)
        });
    }

    public getTeacher(id: number): Observable<Teacher> {
        return this.client.get<Teacher>(`${this.baseUrl}/teachers/${id}`);
    }

    public createTeacher(command: CreateTeacherCommand): Observable<Teacher> {
        return this.client.post<Teacher>(`${this.baseUrl}/teachers`, command);
    }

    public updateTeacher(command: UpdateTeacherCommand): Observable<Teacher> {
        return this.client.put<Teacher>(`${this.baseUrl}/teachers`, command);
    }

    public deleteTeacher(id: number): Observable<void> {
        return this.client.delete<void>(`${this.baseUrl}/teachers/${id}`);
    }
}
