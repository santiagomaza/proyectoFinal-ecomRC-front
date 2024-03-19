import { NavbarPagina } from "../../Components/Navbar/NavbarPagina"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './detalleProducto.css'
import { CajaComentario } from "../../Components/CajaComentario/CajaComentario"
import { CardComentario } from "../../Components/CardComentario/CardComentario"

export const DetalleProducto = () => {
  const { id } = useParams()
  const [productoEspecifico, setProductoEspecifico] = useState({})
  const idUsuario = localStorage.getItem("idUsuario")
  const [comentarios, setComentarios] = useState([])
  const [usuario, setUsuario] = useState({})
  const [hayComentarios, setHayComentarios] = useState(false)

  useEffect(() => {
    const obtenerProductoEspecifico = async () => {
      const respuesta = await axios.get(`http://localhost:8000/productos/${id}`)
      setProductoEspecifico(respuesta.data.producto)
    }

    obtenerProductoEspecifico()
  }, [id])

  useEffect(() => {
    const obtenerUsuarioEspecifico = async () => {
      const respuesta = await axios.get(`http://localhost:8000/usuarios/${idUsuario}`)
      setUsuario(respuesta.data.usuario)
    }

    obtenerUsuarioEspecifico()
  }, [])

  useEffect(() => {
    const obtenerComentarios = async () => {
      const respuesta = await axios.get("http://localhost:8000/comentarios/obtener-comentarios")

      setComentarios(respuesta.data)

      console.log(respuesta.data)
    }

    obtenerComentarios()
  }, [])

  const comentarioProductoEspecifico = comentarios.filter((comentario) => comentario.producto === productoEspecifico.nombre)

  useEffect(() => {
    if(comentarioProductoEspecifico.length > 0){
      setHayComentarios(true)
    }
  }, [comentarioProductoEspecifico])

  return (
    <>
      <NavbarPagina />
      <section className="contenedorDetProd mt-4 mx-2">
        <article className="artDetProducto">
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
      <section className="seccionComentarios">
        <h3 className="mx-4 tituloComentario">Comentarios</h3>
        <CajaComentario usuario = {usuario.username} producto = {productoEspecifico.nombre}/>
        {
          hayComentarios ? 
          comentarioProductoEspecifico.map((comentario) => (
            <CardComentario key={comentario._id} id = {comentario._id} usuario = {comentario.usuario} msj = {comentario.mensaje} fecha = {comentario.fecha}/>
          ))
          :
          <div className="d-flex justify-content-center mt-3">
            <p className="fs-3">Todavia no hay comentarios. ¡Se el primero en comentar!</p>
          </div>
        }
      </section>
    </>
  )
}
