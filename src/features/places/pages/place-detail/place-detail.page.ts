import {ChangeDetectionStrategy, Component, signal, type OnInit, computed, inject} from '@angular/core';
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {HeaderAction, SectionHeaderComponent} from "@shared/components/section-header.component";
import {TranslateModule} from "@ngx-translate/core";
import {Place} from "@/features/places/models/entity";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap, tap} from "rxjs";
import {PlacesApiService} from "@/features/places/services/places-api.service";
import {ConfirmModalComponent} from "@shared/components/modals/confirm-modal/confirm-modal.component";
import {RelatedItemsListComponent} from "@/features/items/components";
import {ItemsApiService} from "@/features/items/services/items-api.service";
import {Item} from "@/features/items/models/entity";
import {Location, NgIf} from "@angular/common";
import {ErrorDisplayComponent} from "@shared/components";

@Component({
    standalone: true,
    imports: [
        PageContentComponent,
        PageHeaderComponent,
        SectionHeaderComponent,
        TranslateModule,
        ConfirmModalComponent,
        RelatedItemsListComponent,
        ErrorDisplayComponent,
        NgIf
    ],
    templateUrl: './place-detail.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceDetailPage implements OnInit {


    route = inject(ActivatedRoute);
    api = inject(PlacesApiService);
    itemApi = inject(ItemsApiService)
    location = inject(Location)
    place = signal<Place | null>(null)
    name = computed(() => this.place()?.name ?? "")
    items = signal<Item[]>([])
    open = signal<boolean>(false);
    error = signal<any>(null)

    actions: HeaderAction[] = [
        {type: 'link', label: 'places.detail.actions.edit.label', route: ['edit']},
        {
            type: 'button',
            label: 'places.detail.actions.delete.label',
            action: () => this.onDelete_Click(),
            variant: 'danger'
        },
    ]

    ngOnInit(): void {
        this.route.paramMap.pipe(
            map(x => Number(x.get('id'))),
            switchMap(x => this.api.get(x)),
            map(x => x.data),
            tap(this.place.set),
            switchMap(x => this.itemApi.search({place: x?.id})),
            tap(x => this.items.set(x.items))
        ).subscribe()
    }

    onDelete_Click() {
        this.open.set(true)
    }

    onDeleteConfirm_Click() {
        this.open.set(false);
        this.api.delete(this.place()?.id!).subscribe({
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
