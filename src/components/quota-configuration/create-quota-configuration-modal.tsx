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
import { CreateQuotaConfigurationRequest } from '@/types/quota-configuration.type';
import { Plus } from 'lucide-react';

interface CreateQuotaConfigurationModalProps {
    onSubmit: (data: CreateQuotaConfigurationRequest) => Promise<void>;
    loading?: boolean;
}

export function CreateQuotaConfigurationModal({
    onSubmit,
    loading = false
}: CreateQuotaConfigurationModalProps) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        fee: '',
        start_date: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fee) {
            newErrors.fee = 'La cuota es requerida';
        } else if (isNaN(Number(formData.fee)) || Number(formData.fee) <= 0) {
            newErrors.fee = 'La cuota debe ser un número positivo';
        }

        if (!formData.start_date) {
            newErrors.start_date = 'La fecha de inicio es requerida';
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
            const dateWithTime = new Date(formData.start_date + 'T00:00:00');

            await onSubmit({
                fee: Number(formData.fee),
                start_date: dateWithTime.toISOString(),
            });

            setFormData({ fee: '', start_date: '' });
            setErrors({});
            setOpen(false);
        } catch {
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
            setFormData({ fee: '', start_date: '' });
            setErrors({});
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Configuración
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nueva Configuración de Cuota</DialogTitle>
                    <DialogDescription>
                        Crea una nueva configuración de cuota con el monto y fecha de inicio
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fee">Monto de la cuota</Label>
                        <Input
                            id="fee"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            value={formData.fee}
                            onChange={(e) => handleInputChange('fee', e.target.value)}
                            className={errors.fee ? 'border-destructive' : ''}
                        />
                        {errors.fee && (
                            <p className="text-sm text-destructive">{errors.fee}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="start_date">Fecha de Inicio</Label>
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
                            {loading ? 'Creando...' : 'Crear Configuración'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 