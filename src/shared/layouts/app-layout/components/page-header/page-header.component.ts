import {ChangeDetectionStrategy, Component, inject, input, type OnInit} from "@angular/core";
import {NgClass, NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {ActivatedRoute, Router, RouterLink, RouterModule} from "@angular/router";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {debounce, debounceTime, from, map, switchMap, take, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {HeaderMenu} from "@shared/navigation/header.menu";
import {ProfileMenu} from "@shared/navigation/profile.menu";
import {AuthService} from "@/features/auth/services";

@Component({
    selector: "oa-page-header",
    standalone: true,
    imports: [
        NgIf,
        TranslateModule,
        RouterLink,
        RouterModule,
        ReactiveFormsModule,
        NgClass
    ],
    templateUrl: "./page-header.component.html",
})
export class PageHeaderComponent {
    menu = HeaderMenu;
    profileMenu = ProfileMenu;
    fb = inject(FormBuilder);
    router = inject(Router);
    route = inject(ActivatedRoute);
    title = input.required<string>();
    open = false;
    search = this.fb.nonNullable.control('');
    auth = inject(AuthService);

    constructor() {
        this.route.queryParamMap.pipe(
            takeUntilDestroyed(),
            map(p => p.get("search"))
        ).subscribe({
            next: (s) => this.search.setValue(s!, {emitEvent: false})
        })

        this.search.valueChanges.pipe(
            debounceTime(1000),
        ).subscribe({
            next: (value) => {
                this.router.navigate([], {
                    relativeTo: this.route,
                    queryParams: { search: value },
                    queryParamsHandling: 'merge',
                });
            },
        })
    }

    toggleMenu() {
        this.open = !this.open;
    }
}
