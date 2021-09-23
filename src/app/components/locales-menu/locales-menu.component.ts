import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EnvironmentService, LocalizationService } from 'app/core';

interface Language {
    name: string;
    code: string;
}

@Component({
    selector: 'app-locales-menu',
    templateUrl: './locales-menu.component.html',
    styleUrls: ['./locales-menu.component.scss']
})
export class LocalesMenuComponent implements OnInit {

    public languages: Language[] = [];

    constructor(
        public translateService: TranslateService,
        private localizationService: LocalizationService,
        private environmentService: EnvironmentService
    ) {
    }

    public ngOnInit(): void {
        this.languages =
            this.environmentService.getValue<string[]>('locales', [])
                .map(code => ({ name: 'LANGUAGE.' + code.toUpperCase(), code }));
    }

    public onLanguageSelect(code: string) {
        this.translateService.use(code);
        this.localizationService.setSavedLang(code);
    }
}
