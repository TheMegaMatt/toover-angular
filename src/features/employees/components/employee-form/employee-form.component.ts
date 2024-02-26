import {Component, EventEmitter, input, Output} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EmployeeForm} from "@/features/employees/models/forms";
import {FormErrorDisplayComponent} from "@shared/components";
import {TranslateModule} from "@ngx-translate/core";
import {RolePickerComponent} from "@/features/employees/components/role-picker/role-picker.component";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'oa-employee-form',
  standalone: true,
  imports: [
    FormErrorDisplayComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RolePickerComponent,
    JsonPipe
  ],
  templateUrl: './employee-form.component.html',
  styles: ``
})
export class EmployeeFormComponent {
  form = input.required<FormGroup<EmployeeForm>>();

  @Output() cancel = new EventEmitter();
  @Output() submitted = new EventEmitter()
  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    this.submitted.emit()
  }
}
