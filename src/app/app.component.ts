import { Component } from '@angular/core';
import { SidenavService } from 'app/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        public sidenavService: SidenavService
    ) {
    }
}
