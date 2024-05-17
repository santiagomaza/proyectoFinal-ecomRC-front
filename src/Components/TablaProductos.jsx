import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import '../styles/tablaProductos.css'
import BotonEditarProducto from './BotonEditarProducto'
import { BotonEliminarProducto } from './BotonEliminarProducto'
import { BotonDestacarProducto } from './BotonDestacarProducto'
import { BotonQuitarDestacado } from './BotonQuitarDestacado'

export const DatoProductoContext = createContext()

export const TablaProductos = () => {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    const obtenerProductos = async () => {
      const respuesta = await axios.get("https://proyectofinal-ecomrc-back.onrender.com/productos/obtener-productos")
      setProductos(respuesta.data.producto)
    }

    obtenerProductos()
  }, [])

  const handleInputChange = (e) => {
    setBusqueda(e.target.value)
  }

  let resultados = []

  if(!busqueda){
    resultados = productos
  }
  else{
    resultados = productos.filter((producto) => producto.nombre.toLowerCase().includes(busqueda.toLowerCase()))
  }

  return (
    <>
      <div className='mt-4'>
        <input type="text" className='px-2 w-25' placeholder='Buscar producto...' onChange={handleInputChange} value={busqueda}/>
      </div>
      
      <div className='table-responsive'>
        <table className="table table-bordered align-middle text-center mt-4">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Imagen</th>
              <th scope="col">Nombre del Producto</th>
              <th scope="col">Categoria</th>
              <th scope="col">Precio</th>
              <th className='descProducto' scope="col">Descripción</th>
              <th scope="col">Destacado</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {
              resultados.length > 0 ?
              resultados.sort((a,b) => +b.destacado - a.destacado)
              .map((producto) => (
                <tr key={producto._id}>
                  <th style={{width: "75px"}} scope="row">{producto._id}</th>
                  <td><img src={producto.imagen1} alt="" style={{height: "100px", width: "100px"}}/></td>
                  <td style={{width: "120px"}}>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td className='fw-bold text-danger'>${producto.precio}</td>
                  <td style={{width: "450px"}}>{producto.descripcion}</td>
                  {
                    producto.destacado === true?
                    <td>
                      <BotonQuitarDestacado idProducto = {producto._id} nombre = {producto.nombre}/>
                    </td>
                    :
                    producto.destacado === false?
                    <td>
                      <BotonDestacarProducto idProducto = {producto._id} nombre = {producto.nombre}/>
                    </td>
                    :
                    <td></td>  
                  }
                  <td>
                    <DatoProductoContext.Provider value={{producto}}>
                      <BotonEditarProducto/>
                    </DatoProductoContext.Provider>
                    
                    <BotonEliminarProducto idProducto = {producto._id} nombre = {producto.nombre}/>
                  </td>
                </tr>
              ))
              :
              <tr>
                <td colSpan="8" className="text-center fw-bold">No se encontraron resultados</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </>

  )
}
