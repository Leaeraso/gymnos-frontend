import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center text-center mb-4">
        <h1 className="text-4xl font-bold">Bienvenido de nuevo a Gymnos</h1>
      </div>
      <div className="grid gap-6 w-90 mx-auto">
        <div className="grid gap-2">
          <Label htmlFor="username" className="text-xl">Usuario</Label>
          <Input id="username" type="text" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password" className="text-xl">Contraseña</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button type="submit" className="w-40 text-lg h-12 text-black">
          Iniciar Sesion
        </Button>
      </div>
    </form>
  )
}
