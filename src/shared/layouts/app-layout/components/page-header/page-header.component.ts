import {ChangeDetectionStrategy, Component, input, type OnInit} from "@angular/core";
import {NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: "oa-page-header",
  standalone: true,
    imports: [
        NgIf,
        TranslateModule,
        RouterLink
    ],
  templateUrl: "./page-header.component.html",
})
export class PageHeaderComponent {

  title = input.required<string>();

  isMenu = false;
  constructor() {}

  toggleMenu() {
    this.isMenu = !this.isMenu;
  }
}
