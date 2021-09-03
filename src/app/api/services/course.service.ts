import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from 'app/core';
import { Observable } from 'rxjs';
import { Course } from 'app/api/models';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    private readonly baseUrl: string;

    constructor(
        private client: HttpClient,
        private environmentService: EnvironmentService
    ) {
        this.baseUrl = environmentService.getValue<string>('apiUrl', '');
    }

    public getCourses(): Observable<Course[]> {
        return this.client.get<Course[]>(`${this.baseUrl}/courses`);
    }
}
