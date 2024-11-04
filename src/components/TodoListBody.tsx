import { CardContent } from './ui/card'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import TodoListItem from './TodoListItem'
import { useModal } from '../context/ModalContext'
import { useEffect, useState } from 'react'
import { API } from '../lib/utils'
import { statusType} from '../../types'

interface taskType {
  _id:string,
  description:string
  status: statusType,
  completed:boolean
}

export default function TodoListBody() {

  const { openModal, modeModal } = useModal()
  const [tasks,setTasks] = useState<taskType[]>([])
  const [status,setStatus] = useState<statusType[]>([])
  const [changeSwitch,setChangeSwitch] = useState<boolean>(false)
  
  useEffect(() => {
    if (modeModal === null || !changeSwitch) {
      API.get('/task/list')
        .then(data => {
          setTasks(data.data.message)
        })
    }

  }, [modeModal,changeSwitch])

  useEffect(() => {

      API.get('/status/list')
        .then(data => {
          console.log(data.data.message);
          setStatus(data.data.message)
        })

  }, [])

  const tasksFilter = tasks.reduce(( acc, task) => {
    if(task.completed) {
      acc.completed++
    }else {
      acc.pending++
    }
    return acc
  },
  { completed:0, pending:0 } )
  

  return (
    <CardContent>
      <div className='grid grid-cols-3 text-center py-4'>
        <div className='border-r border-r-gray-300'>
          <span className='text-4xl font-semibold'>{tasks.length}</span>
          <p className='text-sm text-gray-500'>Total de Tareas</p>
        </div>
        <div className='border-r border-r-gray-300'>
          <span className='text-4xl font-semibold'>{tasksFilter.completed}</span>
          <p className='text-sm text-gray-500'>Tareas Completadas</p>
        </div>
        <div >
          <span className='text-4xl font-semibold'>{tasksFilter.pending}</span>
          <p className='text-sm text-gray-500'>Tareas Pendientes</p>
        </div>
      </div>
      <div className="py-6 flex items-center justify-end">
        <Button onClick={() => openModal('add')}><Plus width={18} />Agregar</Button>
      </div>
      <ul>
      {
         tasks.map((task)=> (
          <TodoListItem changeSwitch={changeSwitch} setChangeSwitch={setChangeSwitch}key={task._id} task={task} status={status}/>
       ))
      }
      </ul>
    </CardContent>
  )
}
