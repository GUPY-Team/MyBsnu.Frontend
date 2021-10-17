import { Component } from '@angular/core';
import { AppUserService } from 'app/modules/auth/services';
import { GlobalLoaderService, SidenavService } from 'app/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    constructor(
        public userService: AppUserService,
        public sidenavService: SidenavService,
        public loaderService: GlobalLoaderService
    ) {
    }

}
