import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
    standalone: true,
    imports: [
        PageContentComponent,
        PageHeaderComponent,
        TranslateModule
    ],
    templateUrl: './settings.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage implements OnInit {

    ngOnInit(): void { }

}
