import { Card } from "./components/ui/card"
import TodoListHeader from "./components/TodoListHeader"
import TodoListBody from "./components/TodoListBody"
import TodoListCreate from "./components/TodoListCreate"
import TodoListEdit from "./components/TodoListEdit"
import TodoListDelete from "./components/TodoListDelete"
export default function TodoList() {

  

  return (
    <Card className='max-w-[600px] text-left mx-auto'>
    <TodoListHeader/>
    <TodoListBody/>
    <TodoListCreate/>
    <TodoListEdit/>
    <TodoListDelete/>
  </Card>
  )
}
