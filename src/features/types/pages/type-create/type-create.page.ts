import {ChangeDetectionStrategy, Component, inject, type OnInit, signal} from '@angular/core';
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {SectionHeaderComponent} from "@shared/components/section-header.component";
import {TranslateModule} from "@ngx-translate/core";
import {TypeFormComponent} from "@/features/types/components";
import {FormBuilder, Validators} from "@angular/forms";
import {Location, NgIf} from "@angular/common";
import {TypesApiService} from "@/features/types/services/types-api.service";
import {DeviceTypeForm} from "@/features/types/models/forms";
import {ErrorDisplayComponent} from "@shared/components";
import {UrlValidators} from "@shared/validators/url";

@Component({
    standalone: true,
    imports: [
        PageHeaderComponent,
        PageContentComponent,
        SectionHeaderComponent,
        TranslateModule,
        TypeFormComponent,
        ErrorDisplayComponent,
        NgIf
    ],
    templateUrl: './type-create.page.html'
})
export class TypeCreatePage implements OnInit {
    location = inject(Location)
    fb = inject(FormBuilder);
    api = inject(TypesApiService)
    error = signal<any | null>(null)

    form = this.fb.nonNullable.group<DeviceTypeForm>({
        name: this.fb.nonNullable.control("", [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15)
        ]),
        iconUrl: this.fb.nonNullable.control("", [
            UrlValidators.validUrl,
            Validators.required,
        ])
    })

    ngOnInit(): void { }

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
