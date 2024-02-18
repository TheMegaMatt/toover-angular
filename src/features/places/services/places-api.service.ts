import { Injectable } from "@angular/core";
import { BaseApiClient } from "@core/services/api.service";
import {
  PlaceListResponse,
  PlaceResponse,
} from "@/features/places/models/response";
import {
  CreatePlaceRequest,
  PlaceListFilter,
  UpdatePlaceRequest,
} from "@/features/places/models/requests";

@Injectable({
  providedIn: "root",
})
export class PlacesApiService extends BaseApiClient<
  PlaceListResponse,
  PlaceResponse,
  PlaceListFilter,
  CreatePlaceRequest,
  UpdatePlaceRequest
> {
  constructor() {
    super("api/places");
  }
}
