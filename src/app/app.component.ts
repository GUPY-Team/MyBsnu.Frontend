import { Component } from '@angular/core';
import { EnvironmentService, LocalizationService, SidenavService } from 'app/core';
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
        private localizationService: LocalizationService,
        private environmentService: EnvironmentService,
    ) {
        this.initLocalization();
    }

    private initLocalization(): void {
        const savedLocale = this.localizationService.getSavedLang();

        if (savedLocale !== null) {
            this.translateService.use(savedLocale);
            return;
        }

        const browserLocale = this.translateService.getBrowserLang();
        const locales = this.environmentService.getValue<string[]>('locales', []);
        if (locales.includes(browserLocale)) {
            this.translateService.use(browserLocale);
            return;
        }

        const locale = this.environmentService.getValue<string>('defaultLocale', 'ua');
        this.translateService.use(locale);
    }
}
