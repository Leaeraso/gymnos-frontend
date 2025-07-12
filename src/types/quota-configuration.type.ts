export interface QuotaConfiguration {
    _id: string;
    quota_amount_configuration_number: number;
    fee: number;
    start_date: Date;
    end_date: Date | null;
}

export interface CreateQuotaConfigurationRequest {
    fee: number;
    start_date: string; // ISO string format
}