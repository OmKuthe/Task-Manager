import react from 'react'
import{Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Task from './pages/Task'
import Errorpage from './pages/Errorpage'
import Signup from './pages/Signup'
import CreateTask from './pages/CreateTask'
import EditTask from './pages/EditTask'
import './index.css';


export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/Login' element={<Login/>} />
      <Route path="/Signup" element={<Signup />} />
      <Route path='/Task' element={<Task/>} />
      <Route path="/tasks/create" element={<CreateTask />} />
      <Route path="/tasks/:id" element={<EditTask />} />
      <Route path='*' element={<Errorpage/>} />
    </Routes>
  )
}