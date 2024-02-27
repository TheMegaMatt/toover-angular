import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {OnChangeFn, OnTouchFn} from "@shared/utils";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {PlacesApiService} from "@/features/places/services/places-api.service";
import {Place} from "@/features/places/models/entity";
import {NgClass, NgIf} from "@angular/common";

@Component({
    selector: 'oa-place-picker',
    standalone: true,
    imports: [
        TranslateModule,
        NgClass,
        NgIf
    ],
    templateUrl: './place-picker.component.html',
    styles: ``,
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: PlacePickerComponent, multi: true}],
})
export class PlacePickerComponent implements ControlValueAccessor, OnInit {
    value = signal(-1)
    disabled = signal(false);
    places = signal<Place[]>([])
    selected = signal<Place | null>(null);
    display = computed(() => this.value() != -1 ? this.places().find(x => x.id == this.value())?.name : 'places.form.name.na');

    readonly dialogOpen = signal(false);

    api = inject(PlacesApiService);


    onChange: OnChangeFn<number> = (value) => {
    }
    onTouch: OnTouchFn = () => {
    }

    writeValue(newValue: number): void {
        this.value.set(newValue);
    }

    registerOnChange(fn: OnChangeFn<number>): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: OnTouchFn): void {
        this.onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    onPick() {
        this.dialogOpen.set(true);
    }

    ngOnInit() {
        this.api.search({name: ''}).subscribe({
            next: (data) => {
                this.places.set(data.items)
            }
        })
    }
}
