import {Component, inject, type OnInit, signal} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {LoginFormComponent} from "@/features/auth/components";
import {AuthContentComponent, AuthTitleComponent} from "@shared/layouts";
import {AuthService} from "@/features/auth/services";
import {LoginCredentials} from "@/features/auth/models";
import {getFirebaseErrorMessage} from "@shared/utils";
import {ErrorDisplayComponent} from "@shared/components";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
    standalone: true,
    imports: [TranslateModule, LoginFormComponent, AuthTitleComponent, AuthContentComponent, ErrorDisplayComponent, NgIf],
    templateUrl: "./login.page.html",

})
export class LoginPage implements OnInit {

    auth = inject(AuthService);
    router = inject(Router);
    error = signal<string | null>(null)

    ngOnInit(): void {
    }

    login(credentials: LoginCredentials) {
        this.auth.login(credentials).subscribe({
            next: async ({user}) => {
                await this.router.navigate(["/"]);
            },
            error: (e) => this.error.set(getFirebaseErrorMessage(e))
        })
    }
}
