import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {TranslateModule} from "@ngx-translate/core";
import {SectionHeaderComponent} from "@shared/components/section-header.component";
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";

@Component({
    standalone: true,
    imports: [
        PageHeaderComponent,
        TranslateModule,
        TranslateModule,
        SectionHeaderComponent,
        PageContentComponent
    ],
    templateUrl: './type-edit.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeEditPage implements OnInit {

    ngOnInit(): void { }

}
