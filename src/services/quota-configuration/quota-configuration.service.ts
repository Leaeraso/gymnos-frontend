import apiClient from '../api/api-client';
import { QuotaConfiguration, CreateQuotaConfigurationRequest } from '@/types/quota-configuration.type';
import { PaginatedResponse } from '@/types/general.type';


export const quotaConfigurationService = {
    // Obtener todas las configuraciones paginadas
    getAll: async (page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<QuotaConfiguration>> => {
        return apiClient<PaginatedResponse<QuotaConfiguration>>(`/quota-amount-configuration?page=${page}&page_size=${pageSize}&sort=quota_amount_configuration_number&order=desc`, {
            method: 'GET',
        });
    },

    // Crear nueva configuración
    create: async (data: CreateQuotaConfigurationRequest): Promise<QuotaConfiguration> => {
        return apiClient<QuotaConfiguration>('/quota-amount-configuration', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    // Actualizar configuración (para uso futuro)
    update: async (id: string, data: Partial<CreateQuotaConfigurationRequest>): Promise<QuotaConfiguration> => {
        return apiClient<QuotaConfiguration>(`/quota-amount-configuration/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
};