import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@/environments";
import {ListResponse} from "@core/models";
import {Icon} from "@/features/types/models";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  http = inject(HttpClient);
  baseUrl = `${environment.baseUrl}api/data/roles` ;
  getAll() {
    return this.http
        .get<ListResponse<string>>(`${this.baseUrl}`)
        .pipe(catchError((caught) => throwError(() => caught.error)));
  }
}
