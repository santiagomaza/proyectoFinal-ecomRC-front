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
import { VerificarEmail } from './Pages/VerificarEmail/VerificarEmail'
import { Bebidas } from './Pages/Bebidas/Bebidas'
import { Indumentaria } from './Pages/Indumentaria/Indumentaria'
import { Videojuegos } from './Pages/Videojuegos/Videojuegos'
import { Vehiculos } from './Pages/Vehiculos/Vehiculos'
import { DetalleProducto } from './Pages/DetalleProducto/DetalleProducto'
import { Carrito } from './Pages/Carrito/Carrito'
import { Favoritos } from './Pages/Favoritos/Favoritos'

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
      <Route path = 'verificar-email/:id' element = {<VerificarEmail />}/>
      <Route path = 'bebidas' element = {<Bebidas />}/>
      <Route path = 'indumentaria' element = {<Indumentaria />}/>
      <Route path='videojuegos' element = {<Videojuegos />}/>
      <Route path='vehiculos' element = {<Vehiculos />}/>
      <Route path = "producto">
        <Route exact path = ':id' element = {<DetalleProducto />}/>
      </Route>
      <Route path = 'carrito' element = {<Carrito />}/>
      <Route path='favoritos' element = {<Favoritos />} />
    </Routes>
  )
}

export default App
