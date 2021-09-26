import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from 'app/modules/auth/services';
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
            requiredPermissions: [Permission.canManageSchedule, Permission.canManageClasses]
        },
        {
            path: '/admin',
            icon: 'admin_panel_settings',
            text: 'ADMIN_PANEL',
            requiredPermissions: [Permission.superAdmin]
        }
    ];

    public menuLinks$: Observable<MenuLink[]>;

    constructor(
        private userService: UserService
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
