import {BaseEntity} from "@core/models";

export interface Place extends BaseEntity {
    name: string;
    itemsCount: number;
}