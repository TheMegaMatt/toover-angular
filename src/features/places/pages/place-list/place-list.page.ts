import {
    ChangeDetectionStrategy,
    Component, computed,
    inject,
    type OnInit, signal,
} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {PlacesApiService} from "../../services/places-api.service";
import {Place} from "@/features/places/models/entity";
import {JsonPipe} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {PlaceCardListComponent} from "@/features/places/components/place-card-list/place-card-list.component";
import {HeaderAction, SectionHeaderComponent} from "@shared/components/section-header.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {debounceTime, finalize, switchMap, tap} from "rxjs";

@Component({
    standalone: true,
    imports: [TranslateModule, PageHeaderComponent, PageContentComponent, JsonPipe, RouterLink, PlaceCardListComponent, SectionHeaderComponent],
    templateUrl: "./place-list.page.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceListPage implements OnInit {
    api = inject(PlacesApiService);
    route = inject(ActivatedRoute);
    places = signal<Place[]>([])
    loading = signal<boolean>(false);
    filter = signal<string>("");
    subtitle = computed(() => this.filter()?.length > 0 ? 'places.list.subtitle.filtered' : 'places.list.subtitle.not-filtered')

    actions: HeaderAction[] = [
        {type: 'link', label: 'places.list.actions.create.label', route: ['create']}
    ]

    constructor() {
        this.route.queryParamMap.pipe(
            takeUntilDestroyed(),
            tap(() => this.loading.set(true)),
            debounceTime(1500),
            switchMap(params => {
                const name  = params.get("search") || "";
                this.filter.set(name);
                return this.api.search({name});
            })
        )
            .subscribe({
                next: value => {
                    this.places.set(value.items);
                    this.loading.set(false)
                },
                error: () => this.loading.set(false)
            })
    }

    ngOnInit(): void {


    }
}
