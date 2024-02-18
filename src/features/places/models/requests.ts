export interface CreatePlaceRequest {
    name: string;
}

export interface UpdatePlaceRequest {
    id: number;
    name: string;
}

export interface AssignToPlaceRequest {
    placeId: number;
    itemId: number;
}

export type PlaceListFilter = string;