import {ChangeDetectionStrategy, Component, inject, type OnInit, signal} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {SectionHeaderComponent} from "@shared/components/section-header.component";
import {EmployeeFormComponent} from "@/features/employees/components/employee-form/employee-form.component";
import {Location, NgIf} from "@angular/common";
import {FormBuilder, Validators} from "@angular/forms";
import {PlacesApiService} from "@/features/places/services/places-api.service";
import {PlaceForm} from "@/features/places/models/forms";
import {EmployeeForm} from "@/features/employees/models/forms";
import {EmployeeApiService} from "@/features/employees/services/employee-api.service";
import {PlaceFormComponent} from "@/features/places/components/place-form/place-form.component";
import {ErrorDisplayComponent} from "@shared/components";

@Component({
    standalone: true,
    imports: [
        TranslateModule,
        PageHeaderComponent,
        PageContentComponent,
        SectionHeaderComponent,
        EmployeeFormComponent,
        PlaceFormComponent,
        ErrorDisplayComponent,
        NgIf
    ],
    templateUrl: './employee-create.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCreatePage implements OnInit {
    location = inject(Location)
    fb = inject(FormBuilder);
    api = inject(EmployeeApiService)
    error = signal<any | null>(null)

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
        ])
    })

    ngOnInit(): void {
    }

    onSubmit() {
        this.form.disable({emitEvent: false})
        this.api.create(this.form.value as any).subscribe({
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
