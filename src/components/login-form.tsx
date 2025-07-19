"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

type LoginFormProps = {
  onSubmit: (credentials: { username: string; password: string }) => void;
  onLoad?: boolean;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<"form">, "onSubmit" | "onLoad">;

export function LoginForm({
  className,
  onLoad,
  onSubmit,
  ...props
}: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center text-center mb-4">
        <h1 className="text-4xl font-bold">Bienvenido de nuevo a Gymnos</h1>
      </div>
      <div className="grid gap-6 w-90 mx-auto">
        <div className="grid gap-2">
          <Label htmlFor="username" className="text-xl">Usuario</Label>
          <Input id="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password" className="text-xl" >Contraseña</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
            </a>
          </div>
          <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button type="submit" className="w-40 text-lg h-12 text-black" disabled={onLoad}>
          {onLoad ? "Cargando..." : "Iniciar Sesión"}
        </Button>
      </div>
    </form>
  )
}
