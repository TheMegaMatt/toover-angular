import {Component, inject, signal} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {IconService} from "@/features/types/services/icon.service";
import {Icon} from "@/features/types/models";
import {NgClass, NgIf} from "@angular/common";
import {animate, style, transition, trigger} from "@angular/animations";
import {OnChangeFn, OnTouchFn} from "@shared/utils";

@Component({
    selector: 'oa-icon-picker',
    standalone: true,
    imports: [
        FormsModule,
        NgClass,
        NgIf,
    ],
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: IconPickerComponent, multi: true}],
    animations: [
        trigger('opacityLeave', [
            transition(':leave', [
                style({opacity: 1}),
                animate('100ms ease-in', style({opacity: 0})),
            ]),
        ]),
    ],
    templateUrl: './icon-picker.component.html',
    styles: ``
})
export class IconPickerComponent implements ControlValueAccessor {
    isOpen = false;
    value = '';
    disabled: boolean = false;
    current = signal<Icon | null>(null);
    hovered = signal<Icon | null>(null);
    icons = signal<Icon[]>([]);

    api = inject(IconService)

    constructor() {
        this.disabled = true;
        this.api
            .getAll()
            .subscribe({
                next: (data) => {
                    this.disabled = false;
                    this.current.set(data.items.find(x => x.name == 'Default') || data.items[0]);
                    this.icons.set(data.items);
                    this.updateValue();
                },
            });
    }


    onChange: OnChangeFn<string> = (value: string) => {
    };
    onTouch = () => {
    };

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: OnChangeFn<string>): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: OnTouchFn): void {
        this.onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onItem_Click(item: Icon) {
        this.current.set(item);
        this.onChange(item.url);
        this.toggleDropdown();
    }

    setHovered(item: Icon) {
        this.hovered.set(item);
    }

    toggleDropdown() {
        if (!this.disabled)
            this.isOpen = !this.isOpen;
    }

    updateValue() {
        if (this.value) {
            let icon = this.icons().find(x => x.url == this.value);
            if (icon) {
                this.current.set(icon);
            }
        }
    }
}
