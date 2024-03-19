import { NavbarPagina } from "../../Components/Navbar/NavbarPagina"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './detalleProducto.css'

export const DetalleProducto = () => {
  const { id } = useParams()
  const [productoEspecifico, setProductoEspecifico] = useState({})

  useEffect(() => {
    const obtenerProductoEspecifico = async () => {
      const respuesta = await axios.get(`http://localhost:8000/productos/${id}`)
      setProductoEspecifico(respuesta.data.producto)
    }

    obtenerProductoEspecifico()
  }, [id])
  return (
    <>
      <NavbarPagina />
      <section className="contenedorDetProd mt-4 mx-2">
        <article>
          <img src={productoEspecifico.imagen1} alt="" className="imgProducto"/>
          <div className="detallesProducto">
            <span className="fs-1 d-block">{productoEspecifico.nombre}</span>
            <span className="d-block fs-3 fst-italic mt-4 categoriaProducto">{productoEspecifico.categoria}</span>
            {
              productoEspecifico.precio === 0 ?
              <span className="fs-2 fw-bold text-danger precio">Gratis</span>
              :
              <span className="fs-2 text-danger fw-bold precio">${productoEspecifico.precio}</span>
            }
            {
              productoEspecifico.stock === 0 ?
              <span className="fs-6 fw-bold mt-5 sinStock d-block">SIN STOCK</span>
              :
              <span className="d-block mt-5 fs-3">Stock: {productoEspecifico.stock}</span>
            }
            <span className="fs-3 fw-bold descripcion">Descripción:</span>
            <p className="descripcion fs-5">{productoEspecifico.descripcion}</p>
            <div className="d-flex botonesAgregarProducto">
              {
                productoEspecifico.stock === 0?
                <button className="btn btn-success me-2" disabled>Agregar al carrito</button>
                :
                <button className="btn btn-success me-2">Agregar al carrito</button>
              }
              <button type="button" className="btn btn-warning">Agregar a Favoritos</button>
            </div>
          </div>
        </article>
      </section>
    </>
  )
}
