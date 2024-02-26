import {ChangeDetectionStrategy, Component, computed, inject, type OnInit, signal} from '@angular/core';
import {HeaderAction, SectionHeaderComponent} from "@shared/components/section-header.component";
import {PageHeaderComponent, PageContentComponent} from "@shared/layouts";
import {TranslateModule} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {switchMap, tap} from "rxjs";
import {Employee} from "@/features/employees/models/entity";
import {EmployeeApiService} from "@/features/employees/services/employee-api.service";
import {
    EmployeesCardListComponent
} from "@/features/employees/components/employees-card-list/employees-card-list.component";

@Component({
    standalone: true,
    imports: [
        SectionHeaderComponent,
        PageContentComponent,
        PageHeaderComponent,
        TranslateModule,
        EmployeesCardListComponent
    ],
    templateUrl: './employee-list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListPage implements OnInit {

    api = inject(EmployeeApiService);
    route = inject(ActivatedRoute);
    employees = signal<Employee[]>([])
    loading = signal<boolean>(false);
    filter = signal<string>("");
    subtitle = computed(() => this.filter()?.length > 0 ? 'employees.list.subtitle.filtered' : 'employees.list.subtitle.not-filtered')

    actions: HeaderAction[] = [
        {type: 'link', label: 'employees.list.actions.create.label', route: ['create']}
    ]

    constructor() {
        this.route.queryParamMap.pipe(
            takeUntilDestroyed(),
            tap(() => this.loading.set(true)),
            switchMap(params => {
                const name  = params.get("search") || "";
                this.filter.set(name);
                return this.api.search({name});
            })
        )
            .subscribe({
                next: value => {
                    this.employees.set(value.items);
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
