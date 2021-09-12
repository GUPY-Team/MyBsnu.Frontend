import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface Language {
    name: string;
    code: string;
}

@Component({
    selector: 'app-settings-menu',
    templateUrl: './settings-menu.component.html',
    styleUrls: ['./settings-menu.component.scss']
})
export class SettingsMenuComponent {

    public languages: Language[] = [
        { name: 'LANGUAGE.UKRAINIAN', code: 'ua' },
        { name: 'LANGUAGE.ENGLISH', code: 'en' },
        { name: 'LANGUAGE.RUSSIAN', code: 'ru' },
    ];

    constructor(
        public translateService: TranslateService
    ) {
    }
}
