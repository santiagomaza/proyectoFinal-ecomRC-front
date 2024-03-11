import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Routes, Route } from 'react-router-dom'
import { Registro } from './Pages/Registro/Registro'
import { Login } from './Pages/Login/Login'

function App() {
  return (
    <Routes>
      <Route path = '/'/>
      <Route path = 'registrarse' element = {<Registro />}/>
      <Route path = "login" element = {<Login />}/>
    </Routes>
  )
}

export default App
