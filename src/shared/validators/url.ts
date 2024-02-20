import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";




export class UrlValidators {
  public static validUrl(control: AbstractControl) {
    let validUrl = true;

    try {
      new URL(control.value)
    } catch {
      validUrl = false;
    }

    return validUrl ? null : { invalidUrl: true };
  }
}
