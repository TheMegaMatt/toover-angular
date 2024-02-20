import {Component, EventEmitter, input, Output} from '@angular/core';
import {FormErrorDisplayComponent} from "@shared/components";
import {TranslateModule} from "@ngx-translate/core";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DeviceTypeForm} from "@/features/types/models/forms";
import {JsonPipe} from "@angular/common";
import {IconPickerComponent} from "@/features/types/components/icon-picker/icon-picker.component";

@Component({
  selector: 'oa-type-form',
  standalone: true,
  imports: [
    FormErrorDisplayComponent,
    TranslateModule,
    ReactiveFormsModule,
    JsonPipe,
    IconPickerComponent
  ],
  templateUrl: './type-form.component.html',
  styles: ``
})
export class TypeFormComponent {
  form = input.required<FormGroup<DeviceTypeForm>>();

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
