import {Component, EventEmitter, input, type OnInit, Output} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {SectionHeaderComponent} from "@shared/components/section-header.component";
import {FormErrorDisplayComponent} from "@shared/components/form-error-display.component";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {PlaceForm} from "@/features/places/models/forms";

@Component({
    selector: 'oa-place-form',
    standalone: true,
    imports: [
        TranslateModule,
        SectionHeaderComponent,
        FormErrorDisplayComponent,
        ReactiveFormsModule
    ],
    templateUrl: './place-form.component.html',
})
export class PlaceFormComponent implements OnInit {

    form = input.required<FormGroup<PlaceForm>>();

    @Output() cancel = new EventEmitter();
    @Output() submitted = new EventEmitter()
    ngOnInit(): void { }

    onCancel() {
        this.cancel.emit();
    }

    onSubmit() {
        this.submitted.emit()
    }
}
