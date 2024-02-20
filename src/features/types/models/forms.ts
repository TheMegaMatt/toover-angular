import {FormControl} from "@angular/forms";

export type DeviceTypeForm = {
    name: FormControl<string>
    iconUrl: FormControl<string>
    id?: FormControl<number>
}
