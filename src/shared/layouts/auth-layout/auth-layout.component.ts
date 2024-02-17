import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'oa-auth-layout',
    standalone: true,
    imports: [
        TranslateModule,
        RouterOutlet,
    ],
    templateUrl: './auth-layout.component.html',

})
export class AuthLayoutComponent implements OnInit {

    ngOnInit(): void { }

}
