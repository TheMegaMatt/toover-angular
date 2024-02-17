import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {BaseComponent} from "./core/components/base.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule],
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent extends BaseComponent {

  constructor() {
    super();
    this.translateService.setDefaultLang('en');
    this.translateService.use('it')
  }
}
