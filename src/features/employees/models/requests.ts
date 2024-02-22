
export interface CreateEmployeeRequest {
    firstName: string;
    lastName: string;
    role: string;
}

export interface UpdateEmployeeRequest {
    id: number;
    firstName?: string;
    lastName?: string;
    role?: string;
}

export interface AssignToEmployeeRequest {
    employeeId: number;
    itemId: number;
}

export type EmployeeListFilter = { name: string };
