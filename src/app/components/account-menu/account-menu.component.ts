import { Component } from '@angular/core';
import { UserService } from 'app/modules/auth/services';

@Component({
    selector: 'app-account-menu',
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent {

    constructor(
        public userService: UserService
    ) {
    }
}
