import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Routes, Route } from 'react-router-dom'
import { Registro } from './Pages/Registro/Registro'
import { Login } from './Pages/Login/Login'
import { Home } from './Pages/Home/Home'
import { Error404 } from './Pages/Error/Error404'

function App() {
  return (
    <Routes>
      <Route path = '/' element={<Home />}/>
      <Route path = 'registrarse' element = {<Registro />}/>
      <Route path = "login" element = {<Login />}/>
      <Route path = "*" element = {<Error404 />}/>
    </Routes>
  )
}

export default App
