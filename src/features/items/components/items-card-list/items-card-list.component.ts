import {Component, computed, input} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {Item} from "../../models/entity";
import {RouterLink} from "@angular/router";
import {Employee} from "@/features/employees/models/entity";
import {NgIf} from "@angular/common";

@Component({
  selector: 'oa-items-card-list',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './items-card-list.component.html',
  styles: ``
})
export class ItemsCardListComponent {
  items = input.required<Item[]>()
  loading = input.required<boolean>();
  filter = input.required<string>();
}
