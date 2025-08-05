"use client";

import { useEffect } from 'react';
import { QuotaConfigurationList } from '@/components/quota-configuration/quota-configuration-list';
import { useQuotaConfigurations } from '@/hooks/quota-configuration/use-quota-configurations';
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

  useEffect(() => {
    fetchConfigurations();
  }, [fetchConfigurations]);

  const handleCreateConfiguration = async (data: CreateQuotaConfigurationRequest) => {
    try {
      await createConfiguration(data);
      fetchConfigurations();
    } catch {
    }
  };

  const handleUpdateConfiguration = async (id: string, data: { fee?: number; start_date?: string }) => {
    try {
      await updateConfiguration(id, data);
      fetchConfigurations();
    } catch {
    }
  };

  const handlePageChange = (page: number) => {
    fetchConfigurations(page);
  };

  const handleRefresh = () => {
    fetchConfigurations(pagination.page);
  };

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
