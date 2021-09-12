import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

export class MissingTranslationService implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        return `WARN: '${params.key}' is missing in '${params.translateService.currentLang}' locale`;
    }
}
