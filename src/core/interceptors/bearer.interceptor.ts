import { AuthService } from "@/features/auth/services/auth.service";
import type {
  HttpErrorResponse,
  HttpInterceptorFn,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, EMPTY, throwError } from "rxjs";

export const bearerTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();
  const router = inject(Router);
  if (token) {
    const Authorization = "Bearer " + token || "";
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization,
      },
    });
    return next(clonedRequest).pipe(
      catchError((e) => handleAuthError(e, router))
    );
  }

  return next(req).pipe(catchError((e) => handleAuthError(e, router)));
};

function handleAuthError(
  err: HttpErrorResponse,
  router: Router
): Observable<any> {
  //handle your auth error or rethrow
  if (err.status === 401 || err.status === 403) {
    router.navigate(["/", "auth", `login`], {
      queryParams: {
        returnUrl: err.url,
      },
    });
    return EMPTY; // or EMPTY may be appropriate here
  }
  return throwError(err);
}
