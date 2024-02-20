import {DataResponse, ListResponse} from "@core/models";
import {Employee} from "@/features/employees/models/entity";

export type EmployeeListResponse = ListResponse<Employee>;
export type EmployeeResponse = DataResponse<Employee>;
