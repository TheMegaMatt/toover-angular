import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import {SectionHeaderComponent} from "@shared/components/section-header.component";
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
    standalone: true,
    imports: [
        SectionHeaderComponent,
        PageContentComponent,
        PageHeaderComponent,
        TranslateModule
    ],
    templateUrl: './employee-list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListPage implements OnInit {

    ngOnInit(): void { }

}
