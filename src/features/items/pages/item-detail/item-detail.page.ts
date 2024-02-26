import {ChangeDetectionStrategy, Component, computed, inject, type OnInit, signal} from '@angular/core';
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {HeaderAction, SectionHeaderComponent} from "@shared/components/section-header.component";
import {TranslateModule} from "@ngx-translate/core";
import {Item, ItemHistory, ItemTimeline} from "@/features/items/models/entity";
import {ItemsApiService} from "@/features/items/services/items-api.service";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap, tap} from "rxjs";
import {DatePipe, JsonPipe, Location, NgIf} from "@angular/common";
import {ConfirmModalComponent} from "@shared/components/modals/confirm-modal/confirm-modal.component";
import {ErrorDisplayComponent} from "@shared/components";
import {RelatedItemsListComponent} from "@/features/items/components";

@Component({
    standalone: true,
    imports: [
        PageContentComponent,
        PageHeaderComponent,
        SectionHeaderComponent,
        TranslateModule,
        ConfirmModalComponent,
        ErrorDisplayComponent,
        NgIf,
        RelatedItemsListComponent,
        DatePipe,
        JsonPipe
    ],
    templateUrl: './item-detail.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailPage {

    readonly item = signal<Item | null>(null);
    readonly history = signal<ItemTimeline[]>([])
    readonly open = signal(false)
    readonly error = signal(null);

    api = inject(ItemsApiService);
    route = inject(ActivatedRoute);
    location = inject(Location)

    note = computed(() => {
        try {
            return this.item()?.note?.trim().replace(/\\n+/g, '\\n')
                .split('\n')
                .map(x => x.split(':'))
                .map(([key, value]) => value ? `<span class="text-cyan-700">${key?.trim()}</span>: ${value?.trim()}` : `<span class="text-cyan-700">${key?.trim()}</span>`).join('<br/>');
        } catch (_) {
            return this.item()?.note;
        }
    });

    actions: HeaderAction[] = [
        {type: 'link', label: 'places.detail.actions.edit.label', route: ['edit']},
        {
            type: 'button',
            label: 'places.detail.actions.delete.label',
            action: () => this.onDelete_Click(),
            variant: 'danger'
        },
    ]

    constructor() {
        this.route.paramMap.pipe(
            map(params => Number(params.get("id"))),
            switchMap(x => this.api.get(x)),
            map(x => x.data),
            tap(this.item.set),
            switchMap(item => this.api.getHistory(item!.id)),
            tap(this.history.set)
        ).subscribe()
    }

    onDelete_Click() {
        this.open.set(true)
    }

    onDeleteConfirm_Click() {
        this.open.set(false);
        this.api.delete(this.item()?.id!).subscribe({
            next: () => {
                this.location.back();
            },
            error: error => {
                this.error.set(error);
            }
        })
    }

    onCancel() {
        this.open.set(false);
    }


}
