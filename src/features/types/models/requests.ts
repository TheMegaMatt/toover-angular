
export interface CreateDeviceTypeRequest {
    iconUrl?: string | null;
    name: string;
}

export interface UpdateDeviceTypeRequest {
    id: number;
    iconUrl?: string | null;
    name?: string | null;
}

export type DeviceTypeListFilter = { name: string };
