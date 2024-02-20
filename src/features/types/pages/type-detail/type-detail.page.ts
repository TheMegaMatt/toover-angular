import {ChangeDetectionStrategy, Component, computed, inject, type OnInit, signal} from '@angular/core';
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {HeaderAction, SectionHeaderComponent} from "@shared/components/section-header.component";
import {TranslateModule} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {PlacesApiService} from "@/features/places/services/places-api.service";
import {Place} from "@/features/places/models/entity";
import {map, switchMap, tap} from "rxjs";
import {TypesApiService} from "@/features/types/services/types-api.service";
import {DeviceType} from "@/features/types/models/entity";
import {ItemsApiService} from "@/features/items/services/items-api.service";
import {RelatedItemsListComponent} from "@/features/items/components";
import {Item} from "@/features/items/models/entity";

@Component({
    standalone: true,
    imports: [
        PageContentComponent,
        PageHeaderComponent,
        SectionHeaderComponent,
        TranslateModule,
        RelatedItemsListComponent
    ],
    templateUrl: './type-detail.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeDetailPage implements OnInit {


    route = inject(ActivatedRoute);
    api = inject(TypesApiService);
    itemsApi = inject(ItemsApiService);

    type = signal<DeviceType | null>(null)
    name = computed(() => this.type()?.name ?? "")
    items = signal<Item[]>([])

    actions: HeaderAction[] = [
        {type: 'link', label: 'types.details.actions.edit', route: ['edit']},
        {type: 'button', label: 'types.details.actions.delete', action: () => this.onDelete_Click(), variant: 'danger'},
    ]

    ngOnInit(): void {
        this.route.paramMap.pipe(
            map(x => Number(x.get('id'))),
            switchMap(x => this.api.get(x)),
            map(x => x.data),
            tap(this.type.set),
            switchMap(x => this.itemsApi.search({ type: x?.id  })),
            tap(x => this.items.set(x.items))
        ).subscribe()
    }

    private onDelete_Click() {

    }

}
