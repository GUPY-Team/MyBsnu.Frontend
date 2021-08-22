import { Component } from '@angular/core';
import { UserService } from 'app/modules/auth/services';
import { SidenavService } from 'app/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    constructor(
        public userService: UserService,
        public sidenavService: SidenavService
    ) {
    }

}
