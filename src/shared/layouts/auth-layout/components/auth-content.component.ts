import { ChangeDetectionStrategy, Component, type OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "oa-auth-content",
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="mt-8">
      <div class="mt-6">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class AuthContentComponent implements OnInit {
  ngOnInit(): void {}
}
