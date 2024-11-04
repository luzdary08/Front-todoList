import { CardDescription, CardHeader, CardTitle } from './ui/card'
import { ModeToggle } from './mode-toggle'


export default function TodoListHeader() {
  return (
    <CardHeader className="flex-row items-center justify-between">
        <div>
            <CardTitle>TodoList</CardTitle>
            <CardDescription >Escribe tu pendiente</CardDescription>
        </div>
         <ModeToggle />
    </CardHeader>
  )
}
