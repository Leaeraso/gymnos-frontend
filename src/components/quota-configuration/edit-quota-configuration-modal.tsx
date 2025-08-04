"use client";

import { useState } from 'react';
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
import { useEditQuotaConfiguration } from '../../hooks/quota-configuration/use-edit-quota-configuration';

interface Props {
    configuration: QuotaConfiguration;
    onSubmit: (id: string, data: { fee?: number; start_date?: string }) => Promise<void>;
    loading?: boolean;
}

export function EditQuotaConfigurationModal({
    configuration,
    onSubmit,
    loading = false
}: Props) {
    const [open, setOpen] = useState(false);

    const {
        formData,
        errors,
        canEdit,
        editReason,
        handleInputChange,
        validateForm,
        resetForm,
    } = useEditQuotaConfiguration(configuration);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const updateData: { fee?: number; start_date?: string } = {};

        if (formData.fee && Number(formData.fee) !== configuration.fee) {
            updateData.fee = Number(formData.fee);
        }

        if (formData.start_date) {
            const dateWithTime = new Date(formData.start_date + 'T00:00:00');
            updateData.start_date = dateWithTime.toISOString();
        }

        if (Object.keys(updateData).length > 0) {
            await onSubmit(configuration._id, updateData);
            setOpen(false);
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            resetForm();
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
