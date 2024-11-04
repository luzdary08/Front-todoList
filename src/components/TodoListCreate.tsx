import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "./ui/dialog"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { z } from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useModal } from "../context/ModalContext"
import { API } from "../lib/utils"
import { useEffect, useState } from "react"
import { statusType } from "../../types"

const formSchema = z.object({
    description: z.string().min(2, {
        message: "Descripción debe tener al menos 2 caracteres",
    }),
    status: z.string(),
})


export default function TodoListCreate() {

    const { closeModal, id, modeModal } = useModal()
     const [status,setStatus] = useState<statusType[]>([])

    useEffect(() => {
        API.get('/status/list')
          .then(data => {
            setStatus(data.data.message)
          })
    
      }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: '',
            status: '',
        },
    })
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        const { data } = await API.post('/task/add',values)
        console.log(data);
        closeModal()
    }

    return (
        <Dialog open={modeModal === 'add'} onOpenChange={closeModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear Tarea</DialogTitle>
                    <DialogDescription>
                        Añade tu nueva tarea para ponerte al dia
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre de la tarea</FormLabel>
                                    <FormControl>
                                        <Input placeholder="tarea" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prioridad</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccione la prioridad de la tarea" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                           {
                                               status.map(statusValue=>(
                                                   <SelectItem key={statusValue._id} value={statusValue._id}>{statusValue.name}</SelectItem>
                                               ))
                                           }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                     
                        <Button type="submit">Agregar</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}
