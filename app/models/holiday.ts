import { LocalizedName } from "./country";

export interface Holiday {
    id: string,
    startDate: string,
    endDate: string,
    type: string,
    name: LocalizedName[],
    regionalScope: string,
    temporalScope: string,
    nationwide: boolean
}