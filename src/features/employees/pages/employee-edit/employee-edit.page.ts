import {ChangeDetectionStrategy, Component, inject, type OnInit, signal} from '@angular/core';
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {SectionHeaderComponent} from "@shared/components/section-header.component";
import {TranslateModule} from "@ngx-translate/core";
import {Location, NgIf} from "@angular/common";
import {FormBuilder, Validators} from "@angular/forms";
import {EmployeeApiService} from "@/features/employees/services/employee-api.service";
import {EmployeeForm} from "@/features/employees/models/forms";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {EmployeeFormComponent} from "@/features/employees/components/employee-form/employee-form.component";
import {ErrorDisplayComponent} from "@shared/components";

@Component({
    standalone: true,
    imports: [
        PageContentComponent,
        PageHeaderComponent,
        SectionHeaderComponent,
        TranslateModule,
        EmployeeFormComponent,
        ErrorDisplayComponent,
        NgIf
    ],
    templateUrl: './employee-edit.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeEditPage {

    location = inject(Location)
    fb = inject(FormBuilder);
    api = inject(EmployeeApiService)
    error = signal<any | null>(null)
    route = inject(ActivatedRoute)
    readonly name = signal("")

    form = this.fb.nonNullable.group<EmployeeForm>({
        firstName: this.fb.nonNullable.control("", [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15)
        ]),
        lastName: this.fb.nonNullable.control("", [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15)
        ]),
        role: this.fb.nonNullable.control("", [
            Validators.required
        ]),
        id: this.fb.nonNullable.control(-1),
    })

    constructor() {
        this.route.paramMap.pipe(
            map(x => Number(x.get('id'))),
            switchMap(id => this.api.get(id)),
            map(emp => emp.data),
            tap(({firstName, lastName}) => this.name.set(`${firstName} ${lastName}`)),
            tap(emp => this.form.patchValue({...emp})),
            takeUntilDestroyed()
        ).subscribe()
    }

    onSubmit() {
        this.form.disable({emitEvent: false})
        this.api.update(this.form.value as any).subscribe({
            next: () => this.location.back(),
            error: (e) => {
                this.error.set(e);
                this.form.enable();
            }
        })
    }

    onCancel() {
        this.location.back();
    }
}
