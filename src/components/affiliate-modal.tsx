import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { CalendarDate } from "./calendar-date";
import { SelectBuilder } from "./select-builder";
import { AffiliateInputForm, AffiliateSex } from "@/types/affiliates.type";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { affiliateService } from "@/services/afiiliate.service";
import { ClipLoader } from "react-spinners";

interface AffiliateModalProps {
    isLoading: boolean,
    isFetching: boolean
}

export function AffiliateModal({isFetching}: AffiliateModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors }
    } = useForm<AffiliateInputForm>()

    const handleDateChange = (date: string) => {
        setValue('date_of_birth', date)
    }

    const handleSexChange = (sex: string) => {
        setValue('sex', sex as AffiliateSex)
    }

    const onSubmit = async (data: AffiliateInputForm) => {
        try {
            console.log('creating affiliate...')
            await affiliateService.createAffiliate(data);

            reset()
            toast.success("Afiliado agregado correctamente")
        } catch (error) {
            reset()
            console.error('Error al agregar un afiliado', error)
            toast.error("Error al agregar el afiliado")
        }
    }

    return (
        <>
            <Dialog>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTrigger>
                        <Button variant="outline" className="cursor-pointer">
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
                                    {...register('lastname', { required: 'El apellido es requerido' })}
                                />
                            </div>
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
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit" className="outline cursor-pointer text-white">
                                {isFetching ? <ClipLoader color="#fff" size={20} aria-label="Cargando..." data-testid="loading-spinner"/> : 'Agregar afiliado'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}