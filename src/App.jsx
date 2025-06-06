import { GlobalProvider } from './context/GlobalContext'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import TaskList from './pages/TaskList'
import AddTask from './pages/AddTask'
import Home from './pages/Home'
import TaskDetails from './pages/TaskDetails'

function App() {
  

  return (
    <GlobalProvider>    
      <BrowserRouter>
        <nav className="NavBar">
          <NavLink to="/" end className="pagina">Home</NavLink>
          <NavLink to="/task" end className="pagina">Task List</NavLink>
          <NavLink to="/add" className="pagina">Add Task</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task" element={<TaskList />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="task/:id" element={<TaskDetails/>}/>        
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
