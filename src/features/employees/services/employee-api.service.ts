import { Injectable } from '@angular/core';
import {BaseApiClient} from "@core/services/api.service";
import {EmployeeListResponse, EmployeeResponse} from "@/features/employees/models/response";
import {CreateEmployeeRequest, EmployeeListFilter, UpdateEmployeeRequest} from "@/features/employees/models/requests";

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService extends BaseApiClient<EmployeeListResponse, EmployeeResponse, EmployeeListFilter, CreateEmployeeRequest, UpdateEmployeeRequest>{

  constructor() {
    super("api/employee")
  }
}
