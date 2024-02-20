import {FormControl} from "@angular/forms";

export type PlaceForm = {
    name: FormControl<string>
    id?: FormControl<number>
}
