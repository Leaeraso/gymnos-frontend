"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QuotaConfiguration, CreateQuotaConfigurationRequest } from '@/types/quota-configuration.type';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { CreateQuotaConfigurationModal } from './create-quota-configuration-modal';
import { EditQuotaConfigurationModal } from './edit-quota-configuration-modal';
import { formatCurrency, formatDate } from '@/lib/utils';

interface QuotaConfigurationListProps {
    configurations: QuotaConfiguration[];
    loading: boolean;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    onPageChange: (page: number) => void;
    onRefresh: () => void;
    onCreateConfiguration: (data: CreateQuotaConfigurationRequest) => Promise<void>;
    onUpdateConfiguration: (id: string, data: { fee?: number; start_date?: string }) => Promise<void>;
}

export function QuotaConfigurationList({
    configurations,
    loading,
    pagination,
    onPageChange,
    onCreateConfiguration,
    onUpdateConfiguration,
}: QuotaConfigurationListProps) {

    if (loading && configurations.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Configuraciones de Cuotas</CardTitle>
                    <CardDescription>Cargando configuraciones...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center py-8">
                        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Configuraciones de Cuotas</CardTitle>
                    <CardDescription>
                        {pagination.total} configuraciones en total
                    </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <CreateQuotaConfigurationModal
                        onSubmit={onCreateConfiguration}
                        loading={loading}
                    />
                </div>
            </CardHeader>
            <CardContent>
                {configurations.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        No hay configuraciones de cuotas disponibles
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="grid gap-4">
                            {configurations.map((config) => (
                                <div
                                    key={config.quota_amount_configuration_number}
                                    className="flex items-center justify-between p-4 border rounded-lg"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                                Configuración #{config.quota_amount_configuration_number}
                                            </span>
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            <div>Cuota: {formatCurrency(config.fee)}</div>
                                            <div>Inicio: {formatDate(config.start_date)}</div>
                                            {config.end_date && (
                                                <div>Fin: {formatDate(config.end_date)}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium">
                                            {formatCurrency(config.fee)}
                                        </div>
                                        <div className="text-base font-bold">
                                            {(config.end_date && config.end_date < new Date()) ? 'Inactiva' : 'Activa'}
                                        </div>
                                        <div className="mt-2">
                                            <EditQuotaConfigurationModal
                                                configuration={config}
                                                onSubmit={onUpdateConfiguration}
                                                loading={loading}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Paginación */}
                        {pagination.totalPages > 1 && (
                            <div className="flex items-center justify-between pt-4 border-t">
                                <div className="text-sm text-muted-foreground">
                                    Página {pagination.page} de {pagination.totalPages}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onPageChange(pagination.page - 1)}
                                        disabled={pagination.page <= 1 || loading}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Anterior
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onPageChange(pagination.page + 1)}
                                        disabled={pagination.page >= pagination.totalPages || loading}
                                    >
                                        Siguiente
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 