import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Routes, Route } from 'react-router-dom'
import { Registro } from './Pages/Registro/Registro'
import { Login } from './Pages/Login/Login'
import { Home } from './Pages/Home/Home'
import { Error404 } from './Pages/Error/Error404'
import { AdminUsuarios } from './Pages/Administración/Usuarios/AdminUsuarios'
import { AdminProductos } from './Pages/Administración/Productos/AdminProductos'
import { AdminCategorias } from './Pages/Administración/Categorias/AdminCategorias'
import { RecuperarContraseñaPrev } from './Pages/RecuperarContraseña/RecuperarContraseñaPrev'
import { RecuperarContraseña } from './Pages/RecuperarContraseña/RecuperarContraseña'
import { Contacto } from './Pages/Contacto/Contacto'

function App() {
  return (
    <Routes>
      <Route path = '/' element={<Home />}/>
      <Route path = 'registrarse' element = {<Registro />}/>
      <Route path = "login" element = {<Login />}/>
      <Route path = "*" element = {<Error404 />}/>
      <Route path='administracion'>
        <Route path='usuarios' element = {<AdminUsuarios />}/>
        <Route path='productos' element = {<AdminProductos />}/>
        <Route path='categorias' element = {<AdminCategorias />}/>
      </Route>
      <Route path = 'restablecerContraseña' element = {<RecuperarContraseñaPrev />}/>
      <Route exact path = 'restablecerContraseña/:token' element = {<RecuperarContraseña />}/>
      <Route path='contacto' element = {<Contacto />}/>
    </Routes>
  )
}

export default App
