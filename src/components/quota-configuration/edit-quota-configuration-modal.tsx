"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { QuotaConfiguration } from '@/types/quota-configuration.type';
import { Edit } from 'lucide-react';
import { useClientDate } from '@/hooks/use-client-date';

interface EditQuotaConfigurationModalProps {
    configuration: QuotaConfiguration;
    onSubmit: (id: string, data: { fee?: number; start_date?: string }) => Promise<void>;
    loading?: boolean;
}

export function EditQuotaConfigurationModal({
    configuration,
    onSubmit,
    loading = false
}: EditQuotaConfigurationModalProps) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        fee: configuration.fee.toString(),
        start_date: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [canEdit, setCanEdit] = useState(true);
    const [editReason, setEditReason] = useState<string>('');
    const currentDate = useClientDate();

    useEffect(() => {
        if (!currentDate) return;

        // Validar si se puede editar según las reglas del backend
        const startDate = new Date(configuration.start_date);
        const lastDayAbleToUpdate = new Date(startDate);
        lastDayAbleToUpdate.setDate(lastDayAbleToUpdate.getDate() + 7);

        const tomorrow = new Date(currentDate);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Verificar si pasaron más de 7 días
        if (lastDayAbleToUpdate < currentDate) {
            setCanEdit(false);
            setEditReason('No se puede editar después de 7 días desde la fecha de inicio');
            return;
        }

        // Verificar si es la primera configuración sin fecha de fin
        if (configuration.quota_amount_configuration_number === 1 && !configuration.end_date) {
            setCanEdit(false);
            setEditReason('No se puede editar la primera configuración activa');
            return;
        }

        setCanEdit(true);
        setEditReason('');
    }, [configuration, currentDate]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (formData.fee && (isNaN(Number(formData.fee)) || Number(formData.fee) <= 0)) {
            newErrors.fee = 'La cuota debe ser un número positivo';
        }

        if (formData.start_date && currentDate) {
            const selectedDate = new Date(formData.start_date + 'T00:00:00');
            const tomorrow = new Date(currentDate);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);

            if (selectedDate > tomorrow) {
                newErrors.start_date = 'La fecha de inicio no puede ser posterior a mañana';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const updateData: { fee?: number; start_date?: string } = {};

            if (formData.fee && Number(formData.fee) !== configuration.fee) {
                updateData.fee = Number(formData.fee);
            }

            if (formData.start_date) {
                const dateWithTime = new Date(formData.start_date + 'T00:00:00');
                updateData.start_date = dateWithTime.toISOString();
            }

            // Solo enviar si hay cambios
            if (Object.keys(updateData).length > 0) {
                await onSubmit(configuration._id, updateData);
                setOpen(false);
            }
        } catch {
            // El error se maneja en el componente padre
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            setFormData({
                fee: configuration.fee.toString(),
                start_date: '',
            });
            setErrors({});
        }
    };

    if (!canEdit) {
        return (
            <Button
                variant="outline"
                size="sm"
                disabled
                title={editReason}
            >
                <Edit className="h-4 w-4" />
            </Button>
        );
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar Configuración #{configuration.quota_amount_configuration_number}</DialogTitle>
                    <DialogDescription>
                        Modifica el monto o la fecha de inicio de esta configuración
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fee">Monto de la cuota (actual: ${configuration.fee})</Label>
                        <Input
                            id="fee"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder={configuration.fee.toString()}
                            value={formData.fee}
                            onChange={(e) => handleInputChange('fee', e.target.value)}
                            className={errors.fee ? 'border-destructive' : ''}
                        />
                        {errors.fee && (
                            <p className="text-sm text-destructive">{errors.fee}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="start_date">Nueva fecha de inicio (opcional)</Label>
                        <Input
                            id="start_date"
                            type="date"
                            value={formData.start_date}
                            onChange={(e) => handleInputChange('start_date', e.target.value)}
                            className={errors.start_date ? 'border-destructive' : ''}
                        />
                        {errors.start_date && (
                            <p className="text-sm text-destructive">{errors.start_date}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            Solo se puede cambiar a una fecha hasta mañana
                        </p>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 