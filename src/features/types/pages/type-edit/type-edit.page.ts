import {ChangeDetectionStrategy, Component, computed, inject, type OnInit, signal} from '@angular/core';
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {TranslateModule} from "@ngx-translate/core";
import {HeaderAction, SectionHeaderComponent} from "@shared/components/section-header.component";
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {ActivatedRoute} from "@angular/router";
import {Location, NgIf} from "@angular/common";
import {map, switchMap, tap} from "rxjs";
import {TypesApiService} from "@/features/types/services/types-api.service";
import {FormBuilder, Validators} from "@angular/forms";
import {DeviceTypeForm} from "@/features/types/models/forms";
import {UrlValidators} from "@shared/validators/url";
import {ErrorDisplayComponent} from "@shared/components";
import {TypeFormComponent} from "@/features/types/components";

@Component({
    standalone: true,
    imports: [
        PageHeaderComponent,
        TranslateModule,
        TranslateModule,
        SectionHeaderComponent,
        PageContentComponent,
        ErrorDisplayComponent,
        NgIf,
        TypeFormComponent
    ],
    templateUrl: './type-edit.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeEditPage implements OnInit {
    location = inject(Location)
    fb = inject(FormBuilder);
    api = inject(TypesApiService)
    error = signal<any | null>(null)
    route = inject(ActivatedRoute);
    name = signal("")

    form = this.fb.nonNullable.group<DeviceTypeForm>({
        name: this.fb.nonNullable.control("", [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15)
        ]),
        iconUrl: this.fb.nonNullable.control("", [
            UrlValidators.validUrl,
            Validators.required,
        ]),
        id: this.fb.nonNullable.control(-1)
    })

    ngOnInit(): void {
        this.route.paramMap.pipe(
            map(x => Number(x.get('id'))),
            switchMap(c => this.api.get(c)),
        ).subscribe({
            next: ({data}) => {
                this.form.patchValue(data);
                this.name.set(data.name)
            }
        })
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
