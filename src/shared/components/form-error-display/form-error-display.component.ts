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
  templateUrl: "./form-error-display.component.html",

})
export class FormErrorDisplayComponent implements OnInit {
  control = input.required<FormControl>();
  ngOnInit(): void {}
}
