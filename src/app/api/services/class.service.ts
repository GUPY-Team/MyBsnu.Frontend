import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from 'app/core';
import { CreateClassCommand, UpdateClassCommand } from 'app/api/commands';
import { Observable } from 'rxjs';
import { Class } from 'app/api/models';

@Injectable({
    providedIn: 'root'
})
export class ClassService {

    private readonly baseUrl: string;

    constructor(
        private client: HttpClient,
        private environmentService: EnvironmentService
    ) {
        this.baseUrl = environmentService.getValue<string>('apiUrl', '');
    }

    public createClass(command: CreateClassCommand): Observable<Class> {
        return this.client.post<Class>(`${this.baseUrl}/classes`, command);
    }

    public updateClass(command: UpdateClassCommand): Observable<Class> {
        return this.client.put<Class>(`${this.baseUrl}/classes`, command);
    }

    public deleteClass(id: number): Observable<void> {
        return this.client.delete<void>(`${this.baseUrl}/classes/${id}`);
    }
}
