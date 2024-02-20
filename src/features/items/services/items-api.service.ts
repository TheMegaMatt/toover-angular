import { Injectable } from "@angular/core";
import { BaseApiClient } from "@core/services/api.service";
import { ItemResponse, ItemsResponse } from "@/features/items/models/response";
import {
  CreateItemRequest,
  ItemListFilters,
  UpdateItemRequest,
} from "@/features/items/models/requests";

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
}
