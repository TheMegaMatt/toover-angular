import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'oa-app-layout',
    templateUrl: './app-layout.component.html',
    standalone: true,
    imports: [RouterOutlet],
})
export class AppLayoutComponent {
}
