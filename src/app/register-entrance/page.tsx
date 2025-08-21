"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRegisterEntrance } from "@/hooks/use-register-entrance";

export default function RegisterEntrancePage() {
  const {
    dni,
    setDni,
    isLoading,
    error,
    success,
    handleSubmit,
  } = useRegisterEntrance();

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            Horus Tech
          </a>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center mb-4">
                <h1 className="text-4xl font-bold">Registro de Entrada</h1>
                <p className="text-muted-foreground mt-2">
                  Ingrese su DNI para registrar su ingreso al gimnasio
                </p>
              </div>
              
              <div className="grid gap-6 w-90 mx-auto">
                <div className="grid gap-2">
                  <Input 
                    id="dni" 
                    type="number" 
                    required 
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="Ingrese su DNI"
                    className="text-lg h-14 text-center text-lg"
                    disabled={isLoading}
                  />
                </div>
                
                {error && (
                  <div className="text-red-500 text-center text-sm">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="text-green-500 text-center text-sm">
                    ¡Entrada registrada con éxito!
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <Button 
                  type="submit" 
                  className="w-40 h-12 text-black" 
                  disabled={isLoading || !dni}
                >
                  {isLoading ? "Procesando..." : "Registrar Entrada"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/login.webp"
          alt="Gym background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          fill
          priority
        />
      </div>
    </div>
  );
}
