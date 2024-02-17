import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
    selector: 'oa-page-content',
    standalone: true,
    imports: [],
    templateUrl: './page-content.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageContentComponent implements OnInit {

    ngOnInit(): void { }

}
