import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date) => {
  if (typeof window === 'undefined') {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  }

  return new Date(date).toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const formatCurrency = (amount: number) => {
  if (typeof window === 'undefined') {
    return `$${amount.toFixed(2)}`;
  }

  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'ARS',
  }).format(amount);
};