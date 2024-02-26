import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    input, model,
    Output
} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
    selector: 'oa-confirm-modal',
    standalone: true,
    imports: [
        NgIf
    ],
    templateUrl: './confirm-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModalComponent {
    title = input.required<string>();
    body = input.required<string>();
    confirmLabel = input("");
    cancelLabel = input("");
    open = input(false);
    @Output() confirm = new EventEmitter();
    @Output() cancel = new EventEmitter();
}
