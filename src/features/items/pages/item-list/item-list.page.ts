import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {SectionHeaderComponent} from "@shared/components/section-header.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
    standalone: true,
    imports: [
        PageHeaderComponent,
        PageContentComponent,
        SectionHeaderComponent,
        TranslateModule
    ],
    templateUrl: './item-list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListPage implements OnInit {

    ngOnInit(): void { }

}
