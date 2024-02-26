import {ChangeDetectionStrategy, Component, computed, inject, type OnInit, signal} from '@angular/core';
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {HeaderAction, SectionHeaderComponent} from "@shared/components/section-header.component";
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {TranslateModule} from "@ngx-translate/core";
import {ErrorDisplayComponent} from "@shared/components";
import {ConfirmModalComponent} from "@shared/components/modals/confirm-modal/confirm-modal.component";
import {ActivatedRoute} from "@angular/router";
import {PlacesApiService} from "@/features/places/services/places-api.service";
import {ItemsApiService} from "@/features/items/services/items-api.service";
import {Location, NgIf} from "@angular/common";
import {Place} from "@/features/places/models/entity";
import {Item} from "@/features/items/models/entity";
import {map, switchMap, tap} from "rxjs";
import {EmployeeApiService} from "@/features/employees/services/employee-api.service";
import {Employee} from "@/features/employees/models/entity";
import {RelatedItemsListComponent} from "@/features/items/components";

@Component({
    standalone: true,
    imports: [
        PageHeaderComponent,
        SectionHeaderComponent,
        PageContentComponent,
        TranslateModule,
        ErrorDisplayComponent,
        ConfirmModalComponent,
        RelatedItemsListComponent,
        NgIf
    ],
    templateUrl: './employee-detail.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailPage implements OnInit {


    route = inject(ActivatedRoute);
    api = inject(EmployeeApiService);
    itemApi = inject(ItemsApiService)
    location = inject(Location)
    employee = signal<Employee | null>(null)
    name = computed(() => this.employee() ? `${this.employee()?.firstName} ${this.employee()?.lastName}` : "")
    items = signal<Item[]>([])
    open = signal<boolean>(false);
    error = signal<any>(null)

    actions: HeaderAction[] = [
        {type: 'link', label: 'employees.detail.actions.edit.label', route: ['edit']},
        {
            type: 'button',
            label: 'employees.detail.actions.delete.label',
            action: () => this.onDelete_Click(),
            variant: 'danger'
        },
    ]

    ngOnInit(): void {
        this.route.paramMap.pipe(
            map(x => Number(x.get('id'))),
            switchMap(x => this.api.get(x)),
            map(x => x.data),
            tap(this.employee.set),
            switchMap(x => this.itemApi.search({owner: x?.id})),
            tap(x => this.items.set(x.items))
        ).subscribe()
    }

    onDelete_Click() {
        this.open.set(true)
    }

    onDeleteConfirm_Click() {
        this.open.set(false);
        this.api.delete(this.employee()?.id!).subscribe({
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
