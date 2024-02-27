import {AbstractControl} from "@angular/forms";

export class DateValidators {
    public static pastDate(control: AbstractControl) {

        if(control.value instanceof Date) {
            return (control.value >= new Date()) ? { dateInFuture: true } : null
        }

        if(typeof control.value == 'string') {
            var date = new Date(control.value);
            return (date >= new Date()) ? { dateInFuture: true } : null
        }

        return null;
    }
}
