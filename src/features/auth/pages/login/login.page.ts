import {ChangeDetectionStrategy, Component, inject, type OnInit, signal} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {LoginFormComponent} from "@/features/auth/components/login-form/login-form.component";
import {AuthTitleComponent} from "@shared/layouts/auth-layout/components/auth-title.component";
import {AuthContentComponent} from "@shared/layouts/auth-layout/components/auth-content.component";
import {AuthService} from "@/features/auth/services/auth.service";
import {LoginCredentials} from "@/features/auth/models";
import {getFirebaseErrorMessage} from "@shared/utils/firebase";
import {ErrorDisplayComponent} from "@shared/components/error-display/error-display.component";
import {NgIf} from "@angular/common";

@Component({
    standalone: true,
    imports: [TranslateModule, LoginFormComponent, AuthTitleComponent, AuthContentComponent, ErrorDisplayComponent, NgIf],
    templateUrl: "./login.page.html",

})
export class LoginPage implements OnInit {

    auth = inject(AuthService);
    error = signal<string | null>(null)

    ngOnInit(): void {
    }

    login(credentials: LoginCredentials) {
        this.auth.login(credentials).subscribe({
            next: ({user}) => {
                alert(`Logged in as ${user.email}`)
            },
            error: (e) => this.error.set(getFirebaseErrorMessage(e))
        })
    }
}