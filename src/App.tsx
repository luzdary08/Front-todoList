import './App.css'
import { ThemeProvider } from "./components/theme-provider"
import { ModalProvider } from './context/ModalContext'
import TodoList from './TodoList'
function App() {
  
 
  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ModalProvider>
            <TodoList />
          </ModalProvider>
      </ThemeProvider>
    
  )
}

export default App
