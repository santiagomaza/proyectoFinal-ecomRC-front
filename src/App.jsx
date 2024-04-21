import '../src/styles/App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Registro } from './Pages/Registro'
import { Login } from './Pages/Login'
import { Home } from './Pages/Home'
import { Error404 } from './Pages/Error404'
import { AdminUsuarios } from './Pages/AdminUsuarios'
import { AdminProductos } from './Pages/AdminProductos'
import { AdminCategorias } from './Pages/AdminCategorias'
import { RecuperarContraseñaPrev } from './Pages/RecuperarContraseñaPrev'
import { RecuperarContraseña } from './Pages/RecuperarContraseña'
import { Contacto } from './Pages/Contacto'
import { VerificarEmail } from './Pages/VerificarEmail'
import { Bebidas } from './Pages/Bebidas'
import { Indumentaria } from './Pages/Indumentaria'
import { Videojuegos } from './Pages/Videojuegos'
import { DetalleProducto } from './Pages/DetalleProducto'
import { Carrito } from './Pages/Carrito'
import { Favoritos } from './Pages/Favoritos'
import { SpinnerCarga } from './Components/SpinnerCarga'
import { QuienesSomos } from './Pages/QuienesSomos'
import { Tecnologia } from './Pages/Tecnologia'

function App() {
  const [cargando, setCargando] = useState(false)
  let tokenUsuario = localStorage.getItem('token')

  useEffect(() => {
    if(tokenUsuario){
      setTimeout(() => {
        localStorage.clear()
        window.location.reload()
      }, 600000);
    }
  }, [])


  useEffect(() => {
    setCargando(true)

    setTimeout(() => {
      setCargando(false)
    }, 1500);
  }, [])

  return (
    <>
      {
        cargando ? 
        <SpinnerCarga loading = {cargando}/>
        :
        <Routes>
          <Route path = '/' element={<Home />}/>
          <Route path = '/registrarse' element = {<Registro />}/>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/*" element = {<Error404 />}/>
          <Route path='/administracion'>
            <Route path='usuarios' element = {<AdminUsuarios/>}/>
            <Route path='productos' element = {<AdminProductos />}/>
            <Route path='categorias' element = {<AdminCategorias />}/>
          </Route>
          <Route path = '/restablecerContraseña' element = {<RecuperarContraseñaPrev />}/>
          <Route path = '/restablecerContraseña/:token' element = {<RecuperarContraseña />}/>
          <Route path = '/contacto' element = {<Contacto />}/>
          <Route path = '/verificar-email/:id' element = {<VerificarEmail />}/>
          <Route path = '/Bebidas' element = {<Bebidas />}/>
          <Route path = '/Indumentaria' element = {<Indumentaria />}/>
          <Route path='/Videojuegos' element = {<Videojuegos />}/>
          <Route path='/Tecnología' element = {<Tecnologia />}/>
          <Route path = "/producto">
            <Route path = ':id' element = {<DetalleProducto />}/>
          </Route>
          <Route path = '/carrito' element = {<Carrito/>}/>
          <Route path ='/favoritos' element = {<Favoritos />} />
          <Route path ='/quienesSomos' element = {<QuienesSomos />}/>
        </Routes>
      }
    </>
  )
}

export default App
