import { ChangeDetectionStrategy, Component, input, type OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import {JsonPipe, KeyValuePipe} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: "oa-form-error-display",
  standalone: true,
    imports: [
        KeyValuePipe,
        TranslateModule,
        JsonPipe
    ],
  template:`
      @if (control().errors && control().touched) {
          @for (err of control().errors | keyvalue; track $index) {
              @if (err.key == 'required') {
                  <p class="mt-2 text-sm text-red-600">{{ 'general.form.errors.required' | translate }}</p>
              }
              @if (err.key == 'minlength') {
                  <p class="mt-2 text-sm text-red-600">{{ 'general.form.errors.min-length' | translate:err.value }}</p>
              }
              @if (err.key == 'maxlength') {
                  <p class="mt-2 text-sm text-red-600">{{ 'general.form.errors.max-length' | translate:err.value }}</p>
              }              
              @if (err.key == 'invalidUrl') {
                  <p class="mt-2 text-sm text-red-600">{{ 'general.form.errors.valid-url' | translate:err.value }}</p>
              }
          }
      }
      
      
  `,

})
export class FormErrorDisplayComponent implements OnInit {
  control = input.required<FormControl>();
  ngOnInit(): void {}
}
