import {BaseEntity} from "@core/models";
import {DeviceType} from "@/features/types/models/entity";
import {Place} from "@/features/places/models/entity";
import {Employee} from "@/features/employees/models/entity";


export interface Item extends BaseEntity {
    name: string;
    label: string;
    note: string | null;
    purchaseDate: string | null;
    owner: Employee | null;
    place: Place;
    type: DeviceType;
}

export interface ItemHistory {
    placeName?: string | null;
    ownerName?: string | null;
    startDate: Date;
    endDate?: Date | null;
}
