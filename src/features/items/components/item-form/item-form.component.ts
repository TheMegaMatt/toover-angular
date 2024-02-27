import {Component, EventEmitter, input, Output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ItemForm} from "@/features/items/models/forms";
import {FormErrorDisplayComponent} from "@shared/components";
import {TranslateModule} from "@ngx-translate/core";
import {PlacePickerComponent} from "@/features/places/components/place-picker/place-picker.component";
import {JsonPipe} from "@angular/common";
import {TypePickerComponent} from "@/features/types/components/type-picker/type-picker.component";
import {EmployeePickerComponent} from "@/features/employees/components/employee-picker/employee-picker.component";

@Component({
  selector: 'oa-item-form',
  standalone: true,
    imports: [
        FormErrorDisplayComponent,
        ReactiveFormsModule,
        TranslateModule,
        PlacePickerComponent,
        JsonPipe,
        TypePickerComponent,
        EmployeePickerComponent
    ],
  templateUrl: './item-form.component.html',
  styles: ``
})
export class ItemFormComponent {

  form = input.required<FormGroup<ItemForm>>();

  @Output() cancel = new EventEmitter();
  @Output() submitted = new EventEmitter()
  ngOnInit(): void { }

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    this.submitted.emit()
  }
}
