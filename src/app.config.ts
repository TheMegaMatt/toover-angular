import {ApplicationConfig, importProvidersFrom, InjectionToken} from "@angular/core";
import {provideRouter} from "@angular/router";

import {routes} from "./app.routes";
import {provideHttpClient, withInterceptors } from "@angular/common/http";
import {TranslateModule} from "@ngx-translate/core";
import {provideTranslation} from "./app.i18n";
import {getAuth} from 'firebase/auth';
import {initializeApp} from "firebase/app";
import {environment} from "./environments";
import {bearerTokenInterceptor} from './core/interceptor/bearerInterceptor.interceptor';

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
    provideHttpClient(withInterceptors([bearerTokenInterceptor])),
    importProvidersFrom(TranslateModule.forRoot(provideTranslation())),
  ],
};
