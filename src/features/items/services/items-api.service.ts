import { Injectable } from "@angular/core";
import { BaseApiClient } from "@core/services/api.service";
import { ItemResponse, ItemsResponse } from "@/features/items/models/response";
import {
  CreateItemRequest,
  ItemListFilters,
  UpdateItemRequest,
} from "@/features/items/models/requests";
import {map, Observable, tap} from "rxjs";
import {ItemHistory, ItemTimeline} from "@/features/items/models/entity";
import {ListResponse} from "@core/models";

@Injectable({
  providedIn: "root",
})
export class ItemsApiService extends BaseApiClient<
  ItemsResponse,
  ItemResponse,
  ItemListFilters,
  CreateItemRequest,
  UpdateItemRequest
> {
  constructor() {
    super('api/items')
  }

  public getHistory(id: number): Observable<ItemTimeline[]> {
    return this.http.get<ListResponse<ItemHistory>>(`${this.baseUrl}/${id}/history`)
        .pipe(
            map(x => x.items.reduce((timeline, history, idx, arr) => {
              if (idx == 0) {
                timeline = [...timeline, {type: 'created', location: history.placeName, date: history.startDate}];
                if (history.ownerName) {
                  timeline = [...timeline, {type: 'assigned', owner: history.ownerName, date: history.startDate}];
                }
              } else {
                if (history.ownerName != arr[idx - 1].ownerName) {
                  if (!history.ownerName) {
                    timeline = [...timeline, {type: 'returned', owner: arr[idx - 1].ownerName, date: history.startDate}];
                  } else {
                    timeline = [...timeline, {type: 'assigned', owner: history.ownerName, date: history.startDate}];
                  }
                }

                if (history.placeName != arr[idx - 1].placeName) {
                  timeline = [...timeline, {
                    type: 'moved', location: arr[idx - 1].placeName, date: history.startDate
                  }];
                }
              }

              return timeline;
            }, [] as any[]).reverse() as ItemTimeline[] ),
            tap(console.log)

        );
  }
}
