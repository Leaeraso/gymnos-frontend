import { useState, useCallback } from 'react';
import { quotaConfigurationService } from '@/services/quota-configuration/quota-configuration.service';
import { QuotaConfiguration, CreateQuotaConfigurationRequest } from '@/types/quota-configuration.type';

export function useQuotaConfigurations() {
    const [configurations, setConfigurations] = useState<QuotaConfiguration[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    });

    // Obtener todas las configuraciones
    const fetchConfigurations = useCallback(async (page: number = 1, pageSize: number = 10) => {
        setLoading(true);
        setError(null);

        try {
            const response = await quotaConfigurationService.getAll(page, pageSize);
            // Convertir las fechas de string a Date si es necesario
            const configurationsWithDates = response.data.map(config => ({
                ...config,
                start_date: new Date(config.start_date),
                end_date: config.end_date ? new Date(config.end_date) : null,
            }));
            setConfigurations(configurationsWithDates);
            setPagination({
                page: response.paginate.page,
                limit: response.paginate.pageSize,
                total: response.paginate.total,
                totalPages: Math.ceil(response.paginate.total / response.paginate.pageSize),
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar las configuraciones');
        } finally {
            setLoading(false);
        }
    }, []);

    // Crear nueva configuración
    const createConfiguration = useCallback(async (data: CreateQuotaConfigurationRequest) => {
        setLoading(true);
        setError(null);

        try {
            const newConfiguration = await quotaConfigurationService.create(data);
            // Convertir las fechas de string a Date si es necesario
            const configurationWithDates = {
                ...newConfiguration,
                start_date: new Date(newConfiguration.start_date),
                end_date: newConfiguration.end_date ? new Date(newConfiguration.end_date) : null,
            };
            setConfigurations(prev => [configurationWithDates, ...prev]);
            return configurationWithDates;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear la configuración');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Actualizar configuración
    const updateConfiguration = useCallback(async (id: string, data: Partial<CreateQuotaConfigurationRequest>) => {
        setLoading(true);
        setError(null);

        try {
            const updatedConfiguration = await quotaConfigurationService.update(id, data);
            // Convertir las fechas de string a Date si es necesario
            const configurationWithDates = {
                ...updatedConfiguration,
                start_date: new Date(updatedConfiguration.start_date),
                end_date: updatedConfiguration.end_date ? new Date(updatedConfiguration.end_date) : null,
            };
            setConfigurations(prev =>
                prev.map(config =>
                    config._id === id ? configurationWithDates : config
                )
            );
            return configurationWithDates;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al actualizar la configuración');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        configurations,
        loading,
        error,
        pagination,
        fetchConfigurations,
        createConfiguration,
        updateConfiguration,
    };
} 