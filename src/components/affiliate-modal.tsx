import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { CalendarDate } from "./calendar-date";
import { SelectBuilder } from "./select-builder";
import { Affiliate, AffiliateInputForm, AffiliateSex } from "@/types/affiliates.type";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { formatDateToAPI } from "@/utils/date.utils";

interface AffiliateModalProps {
    createAffiliateAsync: (data: AffiliateInputForm) => Promise<Affiliate>
    isCreating: boolean
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export function AffiliateModal({createAffiliateAsync, isCreating, isOpen, setIsOpen}: AffiliateModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
    } = useForm<AffiliateInputForm>()

    const handleDateChange = (date: string) => {
        setValue('date_of_birth', date)
    }

    const handleSexChange = (sex: string) => {
        setValue('sex', sex as AffiliateSex)
    }

    const onSubmit = async (data: AffiliateInputForm) => {
        try {
            await createAffiliateAsync({
                ...data,
                date_of_birth: formatDateToAPI(data.date_of_birth)
            });

            reset()
            setIsOpen(false)
            toast.success("Afiliado agregado correctamente")
        } catch (error) {
            reset()
            toast.error("Error al agregar el afiliado")
        }
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="cursor-pointer" onClick={() => setIsOpen(true)}>
                        <Plus className="w-4 h-4" />
                        Agregar afiliado
                    </Button>
                </DialogTrigger>
                <DialogContent id="dialog-content">
                    <DialogHeader className="mb-2">
                        <DialogTitle>Agregar afiliado</DialogTitle>
                        <DialogDescription>
                        ¡Completa el siguiente formulario para agregar un nuevo afiliado al sistema!
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Nombre</Label>
                                <Input id="name" placeholder="Juan"
                                    {...register('name', { required: 'El nombre es requerido' })}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="lastname">Apellido</Label>
                                <Input id="lastname" placeholder="Pérez"
                                    {...register('last_name', { required: 'El apellido es requerido' })}
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 mt-4">
                            <div className="grid gap-3">
                                <Label htmlFor="birthdate">Fecha de nacimiento</Label>
                                <CalendarDate dateValue={watch('date_of_birth')} onChange={handleDateChange}/>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="document">Documento</Label>
                                <Input id="document" placeholder="24567232"
                                    {...register('dni', { required: 'El documento es requerido' })}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="sex">Sexo</Label>
                                <SelectBuilder options={AffiliateSex} placeholder="Seleccionar sexo"
                                    value={watch('sex')}
                                    onChange={handleSexChange}
                                />
                            </div>
                        </div>
                        <DialogFooter className="mt-4">
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit" className="outline cursor-pointer text-white">
                                {isCreating ? <ClipLoader color="#fff" size={20} aria-label="Loading..." data-testid="loading-spinner"/> : 'Agregar afiliado'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}