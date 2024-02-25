import {ChangeDetectionStrategy, Component, computed, inject, type OnInit, signal} from '@angular/core';
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {HeaderAction, SectionHeaderComponent} from "@shared/components/section-header.component";
import {TranslateModule} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap, tap} from "rxjs";
import {ItemsApiService} from "@/features/items/services/items-api.service";
import {Item} from "@/features/items/models/entity";
import {ItemsCardListComponent} from "@/features/items/components/items-card-list/items-card-list.component";

@Component({
    standalone: true,
    imports: [
        PageHeaderComponent,
        PageContentComponent,
        SectionHeaderComponent,
        TranslateModule,
        ItemsCardListComponent
    ],
    templateUrl: './item-list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListPage implements OnInit {

    route = inject(ActivatedRoute);
    itemsApi = inject(ItemsApiService);
    filter = signal("")
    subtitle = computed(() => this.filter() ? 'items.list.subtitle.filtered' : 'items.list.subtitle.not-filtered');
    items = signal<Item[]>([])
    loading = signal(false);
    actions: HeaderAction[] = [
        {type: 'link', label: 'items.list.actions.create.label', route: ['create']}
    ]

    ngOnInit(): void {
        this.route.queryParamMap.pipe(
            tap(_ => this.loading.set(true)),
            map(x => x.get('search') || ""),
            tap(this.filter.set),
            switchMap(term => this.itemsApi.search({name: term})),
            tap(_ =>this.loading.set(false))
        ).subscribe({
            next: (data) => {
                this.items.set(data.items)
            }
        })
    }

}
