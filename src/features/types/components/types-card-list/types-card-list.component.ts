import {Component, input} from '@angular/core';
import {DeviceType} from "@/features/types/models/entity";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'oa-types-card-list',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule
  ],
  templateUrl: './types-card-list.component.html',
  styles: ``
})
export class TypesCardListComponent {
  types = input.required<DeviceType[]>()
  loading = input.required<boolean>();
  filter = input.required<string>();
}
