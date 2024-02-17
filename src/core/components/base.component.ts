import {inject} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

export class BaseComponent {
    protected translateService = inject(TranslateService);

    t(key: string, params: Record<string, string | number> = {} ) {
        return this.translateService.instant(key, params);
    }
}
