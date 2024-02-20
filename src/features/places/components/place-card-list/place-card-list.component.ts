import {Component, input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Place} from "@/features/places/models/entity";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'oa-place-card-list',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule
  ],
  templateUrl: './place-card-list.component.html',
})
export class PlaceCardListComponent {
  places = input.required<Place[]>()
  loading = input.required<boolean>();
  filter = input.required<string>();
}
