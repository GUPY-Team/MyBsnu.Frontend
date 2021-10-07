import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EnvironmentService, PagedList } from 'app/core';
import { Observable } from 'rxjs';
import { Course } from 'app/api/models';
import { CreateCourseCommand, UpdateCourseCommand } from '../commands';

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

    public getCourses(page: number = 1, pageSize: number = 10): Observable<PagedList<Course>> {
        return this.client.get<PagedList<Course>>(`${this.baseUrl}/courses`, {
            params: new HttpParams().set('page', page).set('pageSize', pageSize)
        });
    }

    public getCourse(id: number): Observable<Course> {
        return this.client.get<Course>(`${this.baseUrl}/courses/${id}`);
    }

    public createCourse(command: CreateCourseCommand): Observable<Course> {
        return this.client.post<Course>(`${this.baseUrl}/courses`, command);
    }

    public updateCourse(command: UpdateCourseCommand): Observable<Course> {
        return this.client.put<Course>(`${this.baseUrl}/courses`, command);
    }

    public deleteCourse(id: number): Observable<void> {
        return this.client.delete<void>(`${this.baseUrl}/courses/${id}`);
    }
}
