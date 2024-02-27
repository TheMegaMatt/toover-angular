import {Component, EventEmitter, input, Output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Place} from "@/features/places/models/entity";
import {TranslateModule} from "@ngx-translate/core";
import {NgIf} from "@angular/common";

@Component({
  selector: 'oa-place-card-list',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule,
    NgIf
  ],
  templateUrl: './place-card-list.component.html',
})
export class PlaceCardListComponent {
  places = input.required<Place[]>()
  loading = input.required<boolean>();
  filter = input.required<string>();
  @Output() select = new EventEmitter<Place>();
}
