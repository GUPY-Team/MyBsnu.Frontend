import { Injectable } from '@angular/core';
import {
    CanLoad,
    CanActivateChild,
    Route,
    UrlSegment,
    UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot, Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class GuestOnlyGuard implements CanLoad, CanActivateChild {

    constructor(
        private userService: UserService,
        private router: Router
    ) {
    }

    public canLoad(route: Route, segments: UrlSegment[]):
        Observable<boolean | UrlTree> |
        Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.allowAccess();
    }

    public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> |
        Promise<boolean | UrlTree> |
        boolean |
        UrlTree {
        return this.allowAccess();
    }

    private allowAccess() {
        if (this.userService.currentUser?.token === undefined) {
            return true;
        }
        return this.router.parseUrl('/schedule');
    }
}
