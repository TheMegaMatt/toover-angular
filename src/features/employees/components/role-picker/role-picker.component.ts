import {Component, computed, signal} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {OnChangeFn, OnTouchFn} from "@shared/utils";
import {
    RolePickerDialogComponent
} from "@/features/employees/components/role-picker/role-picker-dialog/role-picker-dialog.component";

@Component({
    selector: 'oa-role-picker',
    standalone: true,
    imports: [
        TranslateModule,
        RolePickerDialogComponent
    ],
    templateUrl: './role-picker.component.html',
    styles: ``,

    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: RolePickerComponent, multi: true}],
})
export class RolePickerComponent implements ControlValueAccessor {

    value = signal("")

    disabled = signal(false);

    readonly dialogOpen = signal(false);

    onChange: OnChangeFn<string> = (value) => {
    }
    onTouch: OnTouchFn = () => {
    }

    writeValue(newValue: string): void {
        this.value.set(newValue);
    }

    registerOnChange(fn: OnChangeFn<string>): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: OnTouchFn): void {
        this.onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    onPick() {
        this.dialogOpen.set(true);
    }

}
