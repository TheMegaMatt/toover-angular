import {ChangeDetectionStrategy, Component, inject, type OnInit, signal} from '@angular/core';
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {SectionHeaderComponent} from "@shared/components/section-header.component";
import {TranslateModule} from "@ngx-translate/core";
import {Location, NgIf} from "@angular/common";
import {FormBuilder, Validators} from "@angular/forms";
import {PlacesApiService} from "@/features/places/services/places-api.service";
import {PlaceForm} from "@/features/places/models/forms";
import {ItemForm} from "@/features/items/models/forms";
import {DateValidators} from "@shared/validators/date";
import {ItemsApiService} from "@/features/items/services/items-api.service";
import {ItemFormComponent} from "@/features/items/components/item-form/item-form.component";
import {ErrorDisplayComponent} from "@shared/components";
import {PlaceFormComponent} from "@/features/places/components/place-form/place-form.component";

@Component({
    standalone: true,
    imports: [
        PageContentComponent,
        PageHeaderComponent,
        SectionHeaderComponent,
        TranslateModule,
        ItemFormComponent,
        ErrorDisplayComponent,
        NgIf,
        PlaceFormComponent
    ],
    templateUrl: './item-create.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCreatePage implements OnInit {

    location = inject(Location)
    fb = inject(FormBuilder);
    api = inject(ItemsApiService)
    error = signal<any | null>(null)

    form = this.fb.nonNullable.group<ItemForm>({
        name: this.fb.nonNullable.control("", [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(25)
        ]),
        label: this.fb.nonNullable.control("", [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(25)
        ]),
        placeId: this.fb.nonNullable.control(-1, [Validators.required]),
        typeId: this.fb.nonNullable.control(-1, [Validators.required]),
        ownerId: this.fb.nonNullable.control<number | null>(null),
        note: this.fb.nonNullable.control("", []),
        purchaseDate: this.fb.nonNullable.control("", [DateValidators.pastDate]),
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
