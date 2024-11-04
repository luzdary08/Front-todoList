import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "./ui/dialog"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { z } from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useModal } from "../context/ModalContext"
import { API } from "../lib/utils"
import { statusType, TaskType } from "../../types"
import { Switch } from "./ui/switch"

const formSchema = z.object({
    description: z.string().min(2, {
        message: "Descripción debe tener al menos 2 caracteres",
    }),
    status: z.string(),
    completed: z.boolean(),
})

interface Props{
    task: TaskType,
    status:statusType[]
}

export default function TodoListEditBody({task,status}:Props) {

    const { modeModal, closeModalWithId, id } = useModal()



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: task.description,
            status: task.status,
            completed:task.completed
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        API.put(`/task/update/${id}`, values)
            .then(data => {
                console.log(data)
                closeModalWithId()
            })
        console.log("values", values)
    }



    return (
        <Dialog open={modeModal === 'edit'} onOpenChange={closeModalWithId}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Tarea</DialogTitle>
                    <DialogDescription>
                        Edita los detalles de tu tarea
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
                                                status.map(statusValue => (<SelectItem key={statusValue._id} value={statusValue._id}>{statusValue.name}</SelectItem>))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />

                        <FormField
                            control={form.control}
                            name="completed"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Completado</FormLabel>

                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            aria-readonly
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Editar Tarea</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}
