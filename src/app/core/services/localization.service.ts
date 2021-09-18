import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalizationService {

    private readonly savedLanguageKey = 'Language';

    public getSavedLang(): string | null {
        return localStorage.getItem(this.savedLanguageKey);
    }

    public setSavedLang(code: string): void {
        localStorage.setItem(this.savedLanguageKey, code);
    }
}
