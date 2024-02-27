import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {SectionHeaderComponent} from "@shared/components/section-header.component";
import {TranslateModule} from "@ngx-translate/core";
import {ErrorDisplayComponent} from "@shared/components";
import {ItemFormComponent} from "@/features/items/components/item-form/item-form.component";
import {Location, NgIf} from "@angular/common";
import {FormBuilder, Validators} from "@angular/forms";
import {ItemsApiService} from "@/features/items/services/items-api.service";
import {ItemForm} from "@/features/items/models/forms";
import {DateValidators} from "@shared/validators/date";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs";

@Component({
    standalone: true,
    imports: [
        PageHeaderComponent,
        PageContentComponent,
        SectionHeaderComponent,
        TranslateModule,
        ErrorDisplayComponent,
        ItemFormComponent,
        NgIf
    ],
    templateUrl: './item-edit.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemEditPage {

    location = inject(Location)
    fb = inject(FormBuilder);
    api = inject(ItemsApiService)
    route = inject(ActivatedRoute);
    error = signal<any | null>(null)
    name = signal("");

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
        id: this.fb.nonNullable.control(-1),
    })

    ngOnInit() {
        this.route.paramMap.pipe(
            map(x => Number(x.get("id"))),
            switchMap(id => this.api.get(id)),
            map(x => x.data),
        ).subscribe({
            next: (i) => {
                this.name.set(i.name)
                this.form.patchValue({...i, ownerId: i.owner?.id, placeId: i.place.id, typeId: i.type.id});
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
