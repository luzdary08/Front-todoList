
import { Checkbox } from "./ui/checkbox"
import { Badge } from "./ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react"
import { useModal } from '../context/ModalContext'
import { statusType } from "../../types"
import { API } from "../lib/utils"

interface taskType {
    _id:string,
    description:string
    status: {
      _id:string,
      name:string,
    },
    completed:boolean
}

interface Props{
    task:taskType
    status:statusType[]
    changeSwitch:boolean,
    setChangeSwitch:(v:boolean) => void
}


export default function TodoListItem({task,status,changeSwitch, setChangeSwitch}:Props) {

    const { openModalWithId } = useModal()

    

    const { description, completed, _id } = task


    async function handleChangeChecked(status:boolean) {
        setChangeSwitch(true)
        API.put(`/task/update/${_id}`, {completed:status})
            .then(data => {
                console.log(data)
            })
            .finally(() =>{
                setChangeSwitch(false)
            })
    }

    return (
        <div className="flex rounded-md border p-4 gap-4">
            <div className="flex gap-4 items-center flex-1">
                <Checkbox defaultChecked={completed} onCheckedChange={ () => handleChangeChecked(!completed)} disabled={changeSwitch}/>
                <div>
                    <h5 className="font-semibold">{description}</h5>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Select defaultValue={task.status._id} disabled={changeSwitch}>
                    <SelectTrigger className="w-[110px]">
                        <SelectValue placeholder="prioridad" />
                    </SelectTrigger>
                    <SelectContent >
                        {
                            status.map(statusValue=>(
                                <SelectItem  key={statusValue._id} value={statusValue._id}>{statusValue.name}</SelectItem>
                            ))
                        }
                    </SelectContent>

                </Select>
                <DropdownMenu >
                    <DropdownMenuTrigger><EllipsisVertical/></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Menú</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem disabled={changeSwitch} onClick={() => openModalWithId(_id,'edit')}>
                        
                            <Pencil/>Editar
                            
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled={changeSwitch}  onClick={() => openModalWithId(_id, 'remove')} ><Trash2/>Borrar</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </div>
    )
}



