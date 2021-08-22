import { Component } from '@angular/core';
import { SidenavService } from 'app/core';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

    constructor(
        public sidenavService: SidenavService
    ) {
    }

}
