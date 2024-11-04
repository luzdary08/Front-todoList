import { useModal } from "../context/ModalContext"
import { API } from "../lib/utils"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog"

export default function TodoListDelete() {

    const { modeModal, closeModalWithId, id } = useModal()

    const handleRemoveTask = async() => {
        const { data } = await API.delete(`/task/delete/${id}`)
        closeModalWithId()
    }
    return (
        <Dialog open={modeModal === 'remove'} onOpenChange={closeModalWithId}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Está usted completamente seguro?</DialogTitle>
                    <DialogDescription>
                        Esta acción no se puede deshacer. Su tarea será eliminada permanentemente.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex items-center justify-end gap-4">
                <Button onClick={closeModalWithId} variant={'outline'}>Cancelar</Button>
                <Button variant={'destructive'} onClick={handleRemoveTask}>Eliminar</Button>
                </div>
            </DialogContent>
        </Dialog>

    )
}
