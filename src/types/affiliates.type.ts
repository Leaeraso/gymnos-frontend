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
    hasPaidLastMonth: boolean
}

export type AffiliateInputForm = {
    name: string,
    lastname: string,
    date_of_birth: string,
    dni: number,
    sex: AffiliateSex
}

export enum AffiliateSex {
    Man = "Hombre",
    Woman = "Mujer",
    Other = "Otro"
}