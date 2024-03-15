import { useState, useEffect } from 'react'
import axios from 'axios'
import './tablaProductos.css'
import BotonEditarProducto from '../BotonEditarProducto/BotonEditarProducto'

export const TablaProductos = () => {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    const obtenerProductos = async () => {
      const respuesta = await axios.get('http://localhost:8000/productos/obtener-productos')
      setProductos(respuesta.data)
      console.log(respuesta.data)
    }

    obtenerProductos()
  }, [])

  return (
    <table className="table table-bordered align-middle text-center mt-4">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Imagen</th>
          <th scope="col">Nombre del Producto</th>
          <th scope="col">Categoria</th>
          <th scope="col">Precio</th>
          <th scope="col">Descripción</th>
          <th scope="col">Destacado</th>
          <th scope="col">Opciones</th>
        </tr>
      </thead>
      <tbody>
        {
          productos &&
          productos.map((producto) => (
            <tr key={producto._id}>
              <th style={{width: "75px"}} scope="row">{producto._id}</th>
              <td><img src={producto.imagen1} alt="" style={{height: "100px", width: "100px"}}/></td>
              <td style={{width: "120px"}}>{producto.nombre}</td>
              <td>{producto.categoria}</td>
              <td className='fw-bold text-danger'>${producto.precio}</td>
              <td style={{width: "300px"}}>{producto.descripcion}</td>
              {
                producto.destacado === true?
                <td>
                  <i className="bi bi-star-fill fs-2 text-warning"></i>
                </td>
                :
                producto.destacado === false?
                <td>
                  <i className="bi bi-star fs-2"></i>
                </td>
                :
                <td></td>  
              }
              <td>
                <BotonEditarProducto 
                idProducto = {producto._id} 
                nombre = {producto.nombre} 
                precio = {producto.precio} 
                stock = {producto.stock}
                categoriaProd = {producto.categoria}
                descripcion = {producto.descripcion}
                imagen1 = {producto.imagen1}
                imagen2 = {producto.imagen2}
                imagen3 = {producto.imagen3}/>
                <button className="btn btn-danger btn-sm"><i className="bi bi-trash2-fill"></i></button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
