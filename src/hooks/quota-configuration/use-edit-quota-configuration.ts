import { useState, useEffect } from 'react';
import { QuotaConfiguration } from '@/types/quota-configuration.type';
import { useClientDate } from '@/hooks/use-client-date';

export function useEditQuotaConfiguration(configuration: QuotaConfiguration) {
    const currentDate = useClientDate();
    const [formData, setFormData] = useState({
        fee: configuration.fee.toString(),
        start_date: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [canEdit, setCanEdit] = useState(true);
    const [editReason, setEditReason] = useState('');

    useEffect(() => {
        if (!currentDate) return;

        const startDate = new Date(configuration.start_date);
        const lastDayAbleToUpdate = new Date(startDate);
        lastDayAbleToUpdate.setDate(lastDayAbleToUpdate.getDate() + 7);

        if (lastDayAbleToUpdate < currentDate) {
            setCanEdit(false);
            setEditReason('No se puede editar después de 7 días desde la fecha de inicio');
            return;
        }

        if (configuration.quota_amount_configuration_number === 1 && !configuration.end_date) {
            setCanEdit(false);
            setEditReason('No se puede editar la primera configuración activa');
            return;
        }

        setCanEdit(true);
        setEditReason('');
    }, [configuration, currentDate]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

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

    const resetForm = () => {
        setFormData({
            fee: configuration.fee.toString(),
            start_date: '',
        });
        setErrors({});
    };

    return {
        formData,
        errors,
        canEdit,
        editReason,
        handleInputChange,
        validateForm,
        resetForm,
        setFormData,
        setErrors
    };
}