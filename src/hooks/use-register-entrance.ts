import { useState } from "react";
import { toast } from "sonner";
import { registerEntrance } from "@/services/entrance/register-entrance.service";

export const useRegisterEntrance = () => {
  const [dni, setDni] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dni) return;
    
    setIsLoading(true);
    
    try {
      await registerEntrance(Number(dni));
      toast.success('¡Entrada registrada con éxito!');
      setDni(null);
    } catch (err) {
      toast.error('Error al registrar la entrada. Verifique el DNI e intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    dni,
    setDni,
    isLoading,
    handleSubmit,
  };
};
