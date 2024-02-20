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
    templateUrl: './employee-edit.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeEditPage implements OnInit {

    ngOnInit(): void { }

}
