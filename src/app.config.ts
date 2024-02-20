import {ApplicationConfig, importProvidersFrom, InjectionToken} from "@angular/core";
import {provideRouter} from "@angular/router";

import {routes} from "./app.routes";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {TranslateModule} from "@ngx-translate/core";
import {provideTranslation} from "./app.i18n";
import {getAuth} from 'firebase/auth';
import {initializeApp} from "firebase/app";
import {environment} from "./environments";
import {bearerTokenInterceptor} from '@core/interceptors/bearer.interceptor';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {languageInterceptor} from '@core/interceptors/language.interceptor';

const app = initializeApp(environment.firebase);

export const AUTH = new InjectionToken("Firebase auth", {
    providedIn: "root",
    factory: () => {
        return getAuth();
    },
});

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([
            bearerTokenInterceptor,
            languageInterceptor,
        ])),
        importProvidersFrom(TranslateModule.forRoot(provideTranslation())),
    ],
};
