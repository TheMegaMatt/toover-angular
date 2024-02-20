import type { HttpInterceptorFn } from "@angular/common/http";
import {inject} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    headers: req.headers.append("Accept-Language", "it-IT"),
  });
  return next(clonedRequest);
};
