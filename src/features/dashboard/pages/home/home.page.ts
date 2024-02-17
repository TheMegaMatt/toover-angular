import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {TranslateModule} from "@ngx-translate/core";
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";

@Component({
    standalone: true,
    imports: [
        PageHeaderComponent,
        TranslateModule,
        PageContentComponent
    ],
    templateUrl: './home.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {

    ngOnInit(): void { }

}
