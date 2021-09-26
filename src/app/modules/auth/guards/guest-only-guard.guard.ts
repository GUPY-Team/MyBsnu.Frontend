import { Injectable } from '@angular/core';
import {
    CanLoad,
    CanActivateChild,
    Route,
    UrlSegment,
    UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class GuestOnlyGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        private userService: UserService,
        private router: Router
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.allowAccess();
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.allowAccess();
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.allowAccess();
    }

    private allowAccess() {
        if (this.userService.user === null) {
            return true;
        }

        return this.router.parseUrl('/');
    }
}
