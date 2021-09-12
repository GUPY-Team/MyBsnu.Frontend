import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface MenuLink {
    path: string;
    icon: string;
    text: string;
}

@Injectable({
    providedIn: 'root'
})
export class SidenavService {

    private _sidenavState = new BehaviorSubject(false);

    public sidenavState$ = this._sidenavState.asObservable();

    public menuLinks: ReadonlyArray<MenuLink> = [
        {
            path: '/schedule/group-schedule',
            icon: 'groups',
            text: 'GROUP_SCHEDULE'
        },
        {
            path: '/schedule/teacher-schedule',
            icon: 'school',
            text: 'TEACHER_SCHEDULE'
        },
        {
            path: '/auth/signin',
            icon: 'account_circle',
            text: 'ACCOUNT'
        },
        {
            path: '/schedule/list',
            icon: 'edit_calendar',
            text: 'SCHEDULE_DESIGNER'
        }
    ];

    public openSidenav(): void {
        this._sidenavState.next(true);
    }

    public closeSidenav(): void {
        this._sidenavState.next(false);
    }
}
