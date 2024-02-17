import {ChangeDetectionStrategy, Component, input, type OnInit} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: "oa-auth-title",
  standalone: true,
  imports: [
    TranslateModule
  ],
  template: `
    <div>
      <img
        class="h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
        {{ title() | translate }}
      </h2>
    </div>
  `,
})
export class AuthTitleComponent implements OnInit {

  title = input.required<string>();

  ngOnInit(): void {}
}
