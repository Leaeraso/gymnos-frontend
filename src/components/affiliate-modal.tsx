import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Calendar, Plus } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Calendar28 } from "./ui/calendar-28";

export function AffiliateModal() {
    return (
        <>
            <Dialog>
                {/* envolver en react hook form */}
                <DialogTrigger>
                    <Button variant="outline" className="cursor-pointer">
                        <Plus className="w-4 h-4" />
                        Agregar afiliado
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader className="mb-2">
                        <DialogTitle>Agregar afiliado</DialogTitle>
                        <DialogDescription>
                        ¡Completa el siguiente formulario para agregar un nuevo afiliado al sistema!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Nombre</Label>
                            <Input id="name" name="name" defaultValue="Juan" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="lastname">Apellido</Label>
                            <Input id="lastname" name="lastname" defaultValue="Pérez" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="birthdate">Fecha de nacimiento</Label>
                            <Calendar28 />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="document">Documento</Label>
                            <Input id="document" name="document" defaultValue="24567232" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="sex">Sexo</Label>
                            {/* Select */}
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" className="outline cursor-pointer text-white">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}