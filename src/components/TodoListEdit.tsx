import { useModal } from "../context/ModalContext"
import { useEffect, useState } from "react"
import { API } from "../lib/utils"
import {  statusType, TaskType } from "../../types"
import TodoListEditBody from "./TodoListtEditBody"


export default function TodoListEdit() {

    const { id } = useModal()
    const [task, setTask] = useState<TaskType | null>(null)
    const [status, setStatus] = useState<statusType[]>([])

    useEffect(() => {
        if (id) {
            API.get(`/task/listById/${id}`)
                .then(data => {
                   setTask(data.data.message as unknown as TaskType)
            })
        }

        return () => {
            setTask(null)
        }

    }, [id])

    
    useEffect(() => {
        API.get(`/status/list`)
            .then(data => {
    
                setStatus(data.data.message)
            })
    }, [])


    if (task && status.length > 0) return (
      <TodoListEditBody task={task} status={status}/>

    )
}
