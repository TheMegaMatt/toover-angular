import {DataResponse, ListResponse} from "@core/models";
import {DeviceType} from "@/features/types/models/entity";


export type DeviceTypeListResponse = ListResponse<DeviceType>;
export type DeviceTypeResponse = DataResponse<DeviceType>;
