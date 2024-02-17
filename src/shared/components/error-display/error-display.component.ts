import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  input,
  type OnInit, Output,
} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: "oa-error-display",
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: "./error-display.component.html"
})
export class ErrorDisplayComponent {
  error = input.required<any>();
  @Output() dismiss = new EventEmitter<unknown>();
}
