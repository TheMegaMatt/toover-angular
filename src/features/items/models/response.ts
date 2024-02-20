import {ListResponse, DataResponse} from "@core/models";
import {Item, ItemHistory} from "@/features/items/models/entity";

export type ItemsResponse = ListResponse<Item>;
export type ItemResponse = DataResponse<Item>;



export type ItemHistoryListResponse = ListResponse<ItemHistory>;
