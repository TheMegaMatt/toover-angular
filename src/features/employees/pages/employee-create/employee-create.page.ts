import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {SectionHeaderComponent} from "@shared/components/section-header.component";

@Component({
    standalone: true,
    imports: [
        TranslateModule,
        PageHeaderComponent,
        PageContentComponent,
        SectionHeaderComponent
    ],
    templateUrl: './employee-create.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCreatePage implements OnInit {

    ngOnInit(): void { }

}
