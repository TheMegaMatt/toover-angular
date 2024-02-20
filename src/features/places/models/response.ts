import {DataResponse, ListResponse} from "@core/models";
import {Place} from "@/features/places/models/entity";

export type PlaceListResponse = ListResponse<Place>;
export type PlaceResponse = DataResponse<Place>;
