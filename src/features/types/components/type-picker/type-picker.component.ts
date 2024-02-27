import {Component, computed, inject, signal} from '@angular/core';
import {OnChangeFn, OnTouchFn} from "@shared/utils";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {DeviceType} from "@/features/types/models";
import {TypesApiService} from "@/features/types/services/types-api.service";
import {NgClass, NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'oa-type-picker',
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
    NgClass
  ],
  templateUrl: './type-picker.component.html',
  styles: ``,

  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: TypePickerComponent, multi: true }],
})
export class TypePickerComponent implements ControlValueAccessor {
  value = signal(-1)
  disabled = signal(false);
  types = signal<DeviceType[]>([])
  selected = signal<DeviceType | null>(null);
  display = computed(() => this.value() != -1 ? this.types().find(x => x.id == this.value())?.name : 'places.form.name.na');

  readonly dialogOpen = signal(false);

  api = inject(TypesApiService);


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
        this.types.set(data.items)
      }
    })
  }
}
