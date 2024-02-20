import {ChangeDetectionStrategy, Component, computed, inject, type OnInit, signal} from '@angular/core';
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {HeaderAction, SectionHeaderComponent} from "@shared/components/section-header.component";
import {TranslateModule} from "@ngx-translate/core";
import {PlacesApiService} from "@/features/places/services/places-api.service";
import {ActivatedRoute} from "@angular/router";
import {Place} from "@/features/places/models/entity";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {switchMap, tap} from "rxjs";
import {DeviceType} from "@/features/types/models/entity";
import {TypesApiService} from "@/features/types/services/types-api.service";
import {TypesCardListComponent} from "@/features/types/components";

@Component({
    standalone: true,
    imports: [
        PageContentComponent,
        PageHeaderComponent,
        SectionHeaderComponent,
        TranslateModule,
        TypesCardListComponent
    ],
    templateUrl: './type-list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeListPage implements OnInit {

    api = inject(TypesApiService);
    route = inject(ActivatedRoute);
    types = signal<DeviceType[]>([])
    loading = signal<boolean>(false);
    filter = signal<string>("");
    subtitle = computed(() => this.filter()?.length > 0 ? 'types.list.subtitle' : 'types.list.all')

    actions: HeaderAction[] = [
        {type: 'link', label: 'types.list.actions.create', route: ['create']}
    ]

    constructor() {
        this.route.queryParamMap.pipe(
            takeUntilDestroyed(),
            tap(() => this.loading.set(true)),
            switchMap(params => {
                const name = params.get("search") || "";
                this.filter.set(name);
                return this.api.search({name});
            })
        ).subscribe({
            next: value => {
                this.types.set(value.items);
                this.loading.set(false)
            },
            error: err => {
                this.loading.set(false)
            }
        })
    }

    ngOnInit(): void {
    }

}
