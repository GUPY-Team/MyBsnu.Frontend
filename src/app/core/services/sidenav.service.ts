import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppUserService } from 'app/modules/auth/services';
import { map } from 'rxjs/operators';
import { Permission } from 'app/api/models/Permission';

interface MenuLink {
    path: string;
    icon: string;
    text: string;
    requiredPermissions: Permission[];
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
            requiredPermissions: []
        },
        {
            path: '/schedule/teacher-schedule',
            icon: 'school',
            text: 'TEACHER_SCHEDULE',
            requiredPermissions: []
        },
        {
            path: '/designer',
            icon: 'edit_calendar',
            text: 'SCHEDULE_DESIGNER',
            requiredPermissions: [Permission.scheduleEditor]
        },
        {
            path: '/admin/users',
            icon: 'people',
            text: 'USERS',
            requiredPermissions: [Permission.superAdmin]
        },
        {
            path: '/admin/courses',
            icon: 'class',
            text: 'COURSES',
            requiredPermissions: [Permission.scheduleEditor]
        },
        {
            path: '/admin/teachers',
            icon: 'school',
            text: 'TEACHERS',
            requiredPermissions: [Permission.scheduleEditor]
        },
        {
            path: '/admin/audiences',
            icon: 'meeting_room',
            text: 'AUDIENCES',
            requiredPermissions: [Permission.scheduleEditor]
        },
        {
            path: '/admin/groups',
            icon: 'groups',
            text: 'GROUPS',
            requiredPermissions: [Permission.scheduleEditor]
        }
    ];

    public menuLinks$: Observable<MenuLink[]>;

    constructor(
        private userService: AppUserService
    ) {
        this.menuLinks$ = this.userService.user$.pipe(
            map(user =>
                this._menuLinks.filter(
                    l => l.requiredPermissions.every(p => user?.satisfiesPermission(p))
                )
            )
        );
    }

    public openSidenav(): void {
        this._sidenavState.next(true);
    }

    public closeSidenav(): void {
        this._sidenavState.next(false);
    }
}
