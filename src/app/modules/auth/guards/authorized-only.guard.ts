import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route, Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'app/modules/auth/services';
import { Permission } from 'app/api/models/Permission';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedOnlyGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        private userService: UserService,
        private router: Router
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.allowAccess(route.data.permissions as Permission[]);
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.allowAccess(childRoute.data.permissions as Permission[]);
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.allowAccess(route.data?.permissions as Permission[]);
    }

    private allowAccess(routePermissions: Permission[]) {
        const user = this.userService.user;
        if (user === null) {
            return this.router.parseUrl('/auth/signin');
        }

        return routePermissions.every(p => user.satisfiesPermission(p));
    }
}
