import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {TranslateModule} from "@ngx-translate/core";
import {provideTranslation} from "./app.i18n";


export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        importProvidersFrom(
            TranslateModule.forRoot(provideTranslation())
        )
    ]
};

