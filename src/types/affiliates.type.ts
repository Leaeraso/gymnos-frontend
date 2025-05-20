import { Quota } from "./quotas.type."

export type Affiliate = {
    _id: string,
    affiliate_number: number,
    name: string,
    last_name: string,
    date_of_birth: string,
    dni: number,
    sex: string,
    created_at: string,
    updated_at: string,
    paid: boolean,
    __v: number
    last_quota?: Quota,
    hasPaidLastMonth: boolean
}

