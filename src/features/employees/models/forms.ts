import {FormControl} from "@angular/forms";

export type EmployeeForm = {
    firstName: FormControl<string>
    lastName: FormControl<string>
    role: FormControl<string>
    id?: FormControl<number>
}
