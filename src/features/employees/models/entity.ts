import {BaseEntity} from "@core/models";

export interface Employee extends BaseEntity {
    firstName: string;
    lastName: string;
    role: string;
    itemsCount: number
}
