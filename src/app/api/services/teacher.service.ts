import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from 'app/core/services/environment.service';
import { Teacher } from 'app/api/models';
import { Observable } from 'rxjs';

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

    public getTeachers(): Observable<Teacher[]> {
        return this.client.get<Teacher[]>(`${this.baseUrl}/teachers`);
    }
}
