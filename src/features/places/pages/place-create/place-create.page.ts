import {ChangeDetectionStrategy, Component, inject, type OnInit, signal} from '@angular/core';
import {PlaceFormComponent} from "@/features/places/components/place-form/place-form.component";
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {PlaceCardListComponent} from "@/features/places/components/place-card-list/place-card-list.component";
import {SectionHeaderComponent} from "@shared/components/section-header.component";
import {TranslateModule} from "@ngx-translate/core";
import {FormBuilder, Validators} from "@angular/forms";
import {Location, NgIf} from "@angular/common";
import {PlacesApiService} from "@/features/places/services/places-api.service";
import {PlaceForm} from "@/features/places/models/forms";
import {ErrorDisplayComponent} from "@shared/components/error-display.component";

@Component({
    standalone: true,
    imports: [
        PlaceFormComponent,
        PageContentComponent,
        PageHeaderComponent,
        PlaceCardListComponent,
        SectionHeaderComponent,
        TranslateModule,
        ErrorDisplayComponent,
        NgIf
    ],
    templateUrl: './place-create.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceCreatePage implements OnInit {

    location = inject(Location)
    fb = inject(FormBuilder);
    api = inject(PlacesApiService)
    error = signal<any | null>(null)

    form = this.fb.nonNullable.group<PlaceForm>({
        name: this.fb.nonNullable.control("", [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15)
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
