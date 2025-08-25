import { CreateQuotaConfigurationFormData } from "@/types/quota-configuration.type";

export const validateForm = (formData: CreateQuotaConfigurationFormData, setErrors: (errors: Record<string, string>) => void) => {
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