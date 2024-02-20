import {BaseEntity} from "@core/models";


export interface DeviceType extends BaseEntity {
    name: string;
    iconUrl: string;
    itemsCount: number;
}
export interface Icon {
    name: string;
    url: string;
}
