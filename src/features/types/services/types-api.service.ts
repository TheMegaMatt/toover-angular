import { Injectable } from "@angular/core";
import { BaseApiClient } from "@core/services/api.service";
import {
  DeviceTypeListResponse,
  DeviceTypeResponse,
} from "@/features/types/models/response";
import {
  CreateDeviceTypeRequest,
  DeviceTypeListFilter,
  UpdateDeviceTypeRequest,
} from "@/features/types/models/requests";

@Injectable({
  providedIn: "root",
})
export class TypesApiService extends BaseApiClient<
  DeviceTypeListResponse,
  DeviceTypeResponse,
  DeviceTypeListFilter,
  CreateDeviceTypeRequest,
  UpdateDeviceTypeRequest
> {
  constructor() {
      super("api/types")
  }
}
