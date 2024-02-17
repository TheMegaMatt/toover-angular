import {ChangeDetectionStrategy, Component, EventEmitter, inject, type OnInit, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";
import {LoginCredentials} from "@/features/auth/models";
import {FormErrorDisplayComponent} from "@shared/components/form-error-display/form-error-display.component";
import {JsonPipe} from "@angular/common";

@Component({
    selector: 'oa-login-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TranslateModule,
        FormErrorDisplayComponent,
    ],
    templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
    @Output() login = new EventEmitter<LoginCredentials>()

    fb = inject(FormBuilder);

    form = this.fb.nonNullable.group({
        email: this.fb.nonNullable.control<string>('', [Validators.required, Validators.email]),
        password: this.fb.nonNullable.control<string>('', [Validators.required])
    })

    onSubmit() {
        this.login.emit({ ...this.form.value as any })
    }
}
