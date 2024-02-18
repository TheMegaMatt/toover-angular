import {
    ChangeDetectionStrategy,
    Component,
    inject,
    type OnInit, signal,
} from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { PageHeaderComponent } from "@shared/layouts/app-layout/components/page-header/page-header.component";
import { PageContentComponent } from "@shared/layouts/app-layout/components/page-content/page-content.component";
import { PlacesApiService } from "../../services/places-api.service";
import {Place} from "@/features/places/models/entity";
import {JsonPipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  standalone: true,
    imports: [TranslateModule, PageHeaderComponent, PageContentComponent, JsonPipe, RouterLink],
  templateUrl: "./place-list.page.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceListPage implements OnInit {
  api = inject(PlacesApiService);

  places = signal<Place[]>([])

  ngOnInit(): void {
      this.api.search("").subscribe({
          next: value => this.places.set(value.items),
          error: err => console.log(JSON.stringify(err))
      })
  }
}
