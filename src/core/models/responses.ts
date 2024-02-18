export interface ErrorResponse {
    message?: string | null;
    code?: string | null;
}

export interface ListResponse<T> {
    items: T[];
    totalCount: number;
}

export interface ItemResponse<T> {
    data: T;
}