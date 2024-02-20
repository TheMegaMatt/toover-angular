import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {SectionHeaderComponent} from "@shared/components/section-header.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
    standalone: true,
    imports: [
        PageContentComponent,
        PageHeaderComponent,
        SectionHeaderComponent,
        TranslateModule
    ],
    templateUrl: './item-create.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCreatePage implements OnInit {

    ngOnInit(): void { }

}
