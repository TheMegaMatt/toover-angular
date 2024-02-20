import {ChangeDetectionStrategy, Component, computed, inject, type OnInit, signal} from '@angular/core';
import {ErrorDisplayComponent} from "@shared/components/error-display.component";
import {Location, NgIf} from "@angular/common";
import {PageContentComponent} from "@shared/layouts/app-layout/components/page-content/page-content.component";
import {PageHeaderComponent} from "@shared/layouts/app-layout/components/page-header/page-header.component";
import {PlaceFormComponent} from "@/features/places/components/place-form/place-form.component";
import {SectionHeaderComponent} from "@shared/components/section-header.component";
import {TranslateModule} from "@ngx-translate/core";
import {FormBuilder, Validators} from "@angular/forms";
import {PlacesApiService} from "../../services/places-api.service";
import {PlaceForm} from "@/features/places/models/forms";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap, tap} from "rxjs";

@Component({
    standalone: true,
    imports: [
        ErrorDisplayComponent,
        NgIf,
        PageContentComponent,
        PageHeaderComponent,
        PlaceFormComponent,
        SectionHeaderComponent,
        TranslateModule
    ],
    templateUrl: './place-edit.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceEditPage {

    location = inject(Location)
    fb = inject(FormBuilder);
    api = inject(PlacesApiService)
    route = inject(ActivatedRoute)
    error = signal<any | null>(null)
    name = signal<string>("");

    form = this.fb.nonNullable.group<PlaceForm>({
        name: this.fb.nonNullable.control("", [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15)
        ]),
        id: this.fb.nonNullable.control<number>(-1, [
            Validators.min(1)
        ]),
    })

    constructor() {
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
