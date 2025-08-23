import { useState } from "react";
import { registerEntrance } from "@/services/entrance/register-entrance.service";

export const useRegisterEntrance = () => {
  const [dni, setDni] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dni) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await registerEntrance(Number(dni));
      setSuccess(true);
      setDni('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Error al registrar la entrada. Verifique el DNI e intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    dni,
    setDni,
    isLoading,
    error,
    success,
    handleSubmit,
  };
};
