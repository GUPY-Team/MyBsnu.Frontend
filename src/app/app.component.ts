import { Component } from '@angular/core';
import { EnvironmentService, SidenavService } from 'app/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        public sidenavService: SidenavService,
        private translateService: TranslateService,
        private environmentService: EnvironmentService
    ) {
        const locale = environmentService.getValue<string>('defaultLocale', 'ua');
        this.translateService.use(locale);
    }
}
