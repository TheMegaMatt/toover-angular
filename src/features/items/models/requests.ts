
export interface CreateItemRequest {
    name: string;
    label?: string | null;
    note?: string | null;
    purchaseDate?: string | null;
    typeId: number;
    ownerId?: number | null;
    placeId: number;
}

export interface UpdateItemRequest {
    id: number;
    name?: string;
    label?: string;
    note?: string | null;
    purchaseDate?: string | null;
    typeId?: number;
    ownerId?: number | null;
    placeId?: number;
}

export interface ItemListFilters {
    name?: string;
    label?: string;
    available?: boolean;
    type?: number | null;
    owner?: number | null;
    place?: number | null;
}
