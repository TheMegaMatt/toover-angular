import {booleanAttribute, Component, input} from '@angular/core';
import {Item} from "@/features/items/models/entity";
import {NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {EmptyListComponent} from "@shared/components/empty-list/empty-list.component";

@Component({
  selector: 'oa-related-items-list',
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
    RouterLink,
    EmptyListComponent
  ],
  templateUrl: './related-items-list.component.html',
  styles: ``
})
export class RelatedItemsListComponent {
  items = input.required<Item[]>();
  showOwner = input(true, {transform: booleanAttribute});
  showPlace = input(true, {transform: booleanAttribute});
  showType = input(true, { transform: booleanAttribute});
  showEdit = input(true, { transform: booleanAttribute});
  showView = input(true, { transform: booleanAttribute});
  showCreate = input(true);
  emptyMessage = input<string>("");
  createMessage = input<string>("");
}
