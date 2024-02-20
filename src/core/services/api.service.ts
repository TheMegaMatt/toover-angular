import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { environment } from "@environment/environment";
import { Observable, catchError, throwError } from "rxjs";

export abstract class BaseApiClient<
  TListResponse,
  TDataResponse,
  TFilter,
  TCreateRequest,
  TUpdateRequest extends {id: number}
> {
  http = inject(HttpClient);
  baseUrl = environment.baseUrl;

  constructor(path: string) {
    this.baseUrl = this.baseUrl + path;
  }

  search(filters: TFilter): Observable<TListResponse> {
    let url = filters ? `${this.baseUrl}${createQueryString(filters)}` : this.baseUrl;
    return this.http
      .get<TListResponse>(url)
      .pipe(catchError((caught) => throwError(() => caught.error)));
  }

  get(id: number): Observable<TDataResponse> {
    return this.http.get<TDataResponse>(`${this.baseUrl}/${id}`).pipe(
        catchError((caught) => throwError(() => caught.error))
    );
  }

  create(request: TCreateRequest) {
    return this.http.post(this.baseUrl, request).pipe(
        catchError((caught) => throwError(() => caught.error))
    );
  }

  update(request: TUpdateRequest) {
    return this.http.put(`${this.baseUrl}/${request.id}`, request).pipe(
        catchError((caught) => throwError(() => caught.error))
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
        catchError((caught) => throwError(() => caught.error))
    );
  }
}

function createQueryString(data: Record<string, any>) {
  const qs = new URLSearchParams();
  for (const key in data) {
    const filter = data[key];
    if (typeof filter == "number" || typeof filter == "boolean") {
      qs.set(key, filter.toString());
    }
    if (typeof filter == "string") {
      qs.set(key, filter);
    }
  }
  return `?${qs.toString()}`;
}
