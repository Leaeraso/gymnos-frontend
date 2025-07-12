"use client";

import { useEffect, useCallback } from 'react';
import { QuotaConfigurationList } from '@/components/quota-configuration-list';
import { useQuotaConfigurations } from '@/hooks/use-quota-configurations';
import { CreateQuotaConfigurationRequest } from '@/types/quota-configuration.type';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function QuotasConfiguration() {
  const {
    configurations,
    loading,
    error,
    pagination,
    fetchConfigurations,
    createConfiguration,
    updateConfiguration,
  } = useQuotaConfigurations();

  // Cargar configuraciones al montar el componente
  useEffect(() => {
    fetchConfigurations();
  }, [fetchConfigurations]);

  const handleCreateConfiguration = useCallback(async (data: CreateQuotaConfigurationRequest) => {
    try {
      await createConfiguration(data);
      // Recargar la lista después de crear
      fetchConfigurations();
    } catch {
      // El error ya se maneja en el hook
    }
  }, [createConfiguration, fetchConfigurations]);

  const handleUpdateConfiguration = useCallback(async (id: string, data: { fee?: number; start_date?: string }) => {
    try {
      await updateConfiguration(id, data);
      // Recargar la lista después de actualizar
      fetchConfigurations();
    } catch {
      // El error ya se maneja en el hook
    }
  }, [updateConfiguration, fetchConfigurations]);

  const handlePageChange = useCallback((page: number) => {
    fetchConfigurations(page);
  }, [fetchConfigurations]);

  const handleRefresh = useCallback(() => {
    fetchConfigurations(pagination.page);
  }, [fetchConfigurations, pagination.page]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configuración de Cuotas</h1>
        <p className="text-muted-foreground">
          Gestiona las configuraciones de cuotas del sistema
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <QuotaConfigurationList
        configurations={configurations}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRefresh={handleRefresh}
        onCreateConfiguration={handleCreateConfiguration}
        onUpdateConfiguration={handleUpdateConfiguration}
      />
    </div>
  );
}
