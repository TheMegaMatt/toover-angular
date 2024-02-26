import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule],
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent {
  private translateService = inject(TranslateService);
   
  constructor() {
    this.translateService.use('en')
  }
}
