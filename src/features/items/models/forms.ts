import {FormControl} from "@angular/forms";

export type ItemForm = {
    name: FormControl<string>
    label: FormControl<string>
    note: FormControl<string | null>
    purchaseDate: FormControl<string | null>
    ownerId: FormControl<number | null>
    placeId: FormControl<number>,
    typeId: FormControl<number>
    id?: FormControl<number>
}
