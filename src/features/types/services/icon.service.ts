import {inject, Injectable} from '@angular/core';
import {environment} from "@/environments";
import {HttpClient} from "@angular/common/http";
import {ListResponse} from "@core/models";
import {catchError, throwError} from "rxjs";
import {Icon} from "@/features/types/models/entity";

@Injectable({
  providedIn: 'root'
})
export class IconService {
  http = inject(HttpClient);
  baseUrl = `${environment.baseUrl}api/data/icons` ;
  getAll() {
    return this.http
        .get<ListResponse<Icon>>(`${this.baseUrl}`)
        .pipe(catchError((caught) => throwError(() => caught.error)));
  }
}
