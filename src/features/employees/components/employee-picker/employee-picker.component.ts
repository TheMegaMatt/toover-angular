import {Component, computed, inject, signal} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {OnChangeFn, OnTouchFn} from "@shared/utils";
import {Employee} from "@/features/employees/models/entity";
import {EmployeeApiService} from "@/features/employees/services/employee-api.service";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'oa-employee-picker',
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
    NgClass
  ],
  templateUrl: './employee-picker.component.html',
  styles: ``,

  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: EmployeePickerComponent, multi: true }],
})
export class EmployeePickerComponent implements ControlValueAccessor {
  value = signal(-1)
  disabled = signal(false);
  employees = signal<Employee[]>([])
  selected = signal<Employee | null>(null);
  display = computed(() => {
    if (this.value() != -1) {
      let item = this.employees().find(x => x.id == this.value());
      let name = `${item?.firstName || ''} ${item?.lastName || ''}`.trim();
      return name || 'places.form.name.na';
    } else {
      return 'places.form.name.na';
    }
  });

  readonly dialogOpen = signal(false);

  api = inject(EmployeeApiService);


  onChange: OnChangeFn<number> = (value) => {
  }
  onTouch: OnTouchFn = () => {
  }

  writeValue(newValue: number): void {
    this.value.set(newValue);
  }

  registerOnChange(fn: OnChangeFn<number>): void {
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

  ngOnInit() {
    this.api.search({name: ''}).subscribe({
      next: (data) => {
        this.employees.set(data.items)
        this.value.set(this.value())
      }
    })
  }
}
