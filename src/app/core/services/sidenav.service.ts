import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from 'app/modules/auth/services';
import { map } from 'rxjs/operators';

interface MenuLink {
    path: string;
    icon: string;
    text: string;
    requiresAuth: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class SidenavService {

    private _sidenavState = new BehaviorSubject(false);

    public sidenavState$ = this._sidenavState.asObservable();

    private _menuLinks: ReadonlyArray<MenuLink> = [
        {
            path: '/schedule/group-schedule',
            icon: 'groups',
            text: 'GROUP_SCHEDULE',
            requiresAuth: false
        },
        {
            path: '/schedule/teacher-schedule',
            icon: 'school',
            text: 'TEACHER_SCHEDULE',
            requiresAuth: false
        },
        {
            path: '/schedule/list',
            icon: 'edit_calendar',
            text: 'SCHEDULE_DESIGNER',
            requiresAuth: true
        }
    ];

    public menuLinks$: Observable<MenuLink[]>;

    constructor(
        private userService: UserService
    ) {
        this.menuLinks$ = this.userService.user$.pipe(
            map(user => this._menuLinks.filter(l => l.requiresAuth ? user : true))
        );
    }

    public openSidenav(): void {
        this._sidenavState.next(true);
    }

    public closeSidenav(): void {
        this._sidenavState.next(false);
    }
}
