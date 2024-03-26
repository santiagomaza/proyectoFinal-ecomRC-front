import { NavbarPagina } from "../Components/NavbarPagina"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import '../styles/detalleProducto.css'
import { CajaComentario } from "../Components/CajaComentario"
import { CardComentario } from "../Components/CardComentario"
import { Footer } from "../Components/Footer"
import Swal from 'sweetalert2'

export const DetalleProducto = () => {
  const [productoEspecifico, setProductoEspecifico] = useState({})
  const [comentarios, setComentarios] = useState([])
  const [usuario, setUsuario] = useState({})
  const [hayComentarios, setHayComentarios] = useState(false)
  const [usuarioLogueado, setUsuarioLogueado] = useState(false)
  const [carrito, setCarrito] = useState([])
  const [hayCarrito, setHayCarrito] = useState(false)
  const [favoritos, setFavoritos] = useState([])
  const [hayFavoritos, setHayFavoritos] = useState(false)
  
  const navigate = useNavigate()
  const idUsuario = localStorage.getItem("idUsuario")
  const { id } = useParams()
  const token = localStorage.getItem("token")

  useEffect(() => {
    const obtenerProductoEspecifico = async () => {
      const respuesta = await axios.get(`https://proyectofinal-ecomrc-back.onrender.com/productos/${id}`)
      setProductoEspecifico(respuesta.data.producto)
    }

    obtenerProductoEspecifico()
  }, [id])

  useEffect(() => {
    if(idUsuario){
      const obtenerUsuarioEspecifico = async () => {
        const respuesta = await axios.get(`https://proyectofinal-ecomrc-back.onrender.com/usuarios/${idUsuario}`)
        setUsuario(respuesta.data.usuario)
      }
  
      obtenerUsuarioEspecifico()
    }
  }, [idUsuario])

  useEffect(() => {
    const obtenerComentarios = async () => {
      const respuesta = await axios.get("https://proyectofinal-ecomrc-back.onrender.com/comentarios/obtener-comentarios")

      setComentarios(respuesta.data)
    }

    obtenerComentarios()
  }, [])

  const comentarioProductoEspecifico = comentarios.filter((comentario) => comentario.producto === productoEspecifico.nombre)

  useEffect(() => {
    if(comentarioProductoEspecifico.length > 0){
      setHayComentarios(true)
    }
  }, [comentarioProductoEspecifico])

  useEffect(() => {
    if(idUsuario){
      setUsuarioLogueado(true)
    }
  }, [idUsuario])

  useEffect(() => {
    const obtenerCarrito = async () => {
      const respuesta = await axios.get("https://proyectofinal-ecomrc-back.onrender.com/carritos/obtener-carrito")

      setCarrito(respuesta.data)
    }

    obtenerCarrito()
  }, [])

  
  const agregarCarrito = async (productoEspecifico) => {
    const respuesta = await axios.post("https://proyectofinal-ecomrc-back.onrender.com/carritos/crear-carrito", {
      producto: productoEspecifico,
      usuario: usuario.username,
      accessToken: token
    })

    if(respuesta.data.status === 201){
      Swal.fire({
        icon:'success',
        title: "Producto agregado al carrito",
        showConfirmButton: false,
        timer: 1500
      })

      setTimeout(() => {
        navigate(0)
      }, 1500);
    }
    else if(respuesta.data.status === 500){
      Swal.fire({
        icon: 'error',
        title: "No se pudo agregar el producto al carrito porque el token expiró o es inexistente",
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  
  useEffect(() => {
    const carritoUsuario = carrito.filter((cart) => cart.producto._id)
    for (let i = 0; i < carrito.length; i++) {
      if(carritoUsuario[i].producto._id === productoEspecifico._id && carritoUsuario[i].usuario === usuario.username){
        setHayCarrito(true)
      }
      
    }
  }, [carrito, productoEspecifico])

  useEffect(() => {
    const obtenerFavoritos = async () => {
      const respuesta = await axios.get("https://proyectofinal-ecomrc-back.onrender.com/favoritos/obtener-favoritos")

      setFavoritos(respuesta.data)
    }

    obtenerFavoritos()
  }, [])

  const favoritoUsuario = favoritos.filter((fav) => fav.producto._id)

  useEffect(() => {
    for (let i = 0; i < favoritos.length; i++) {
      if(favoritoUsuario[i].producto._id === productoEspecifico._id && favoritoUsuario[i].usuario === usuario.username){
        setHayFavoritos(true)
      }
    }
  }, [favoritos.length, favoritoUsuario, productoEspecifico])

  const agregarFavoritos = async (productoEspecifico) => {
    const respuesta = await axios.post("https://proyectofinal-ecomrc-back.onrender.com/favoritos/crear-favorito", {
      producto: productoEspecifico,
      usuario: usuario.username,
      accessToken: token
    })

    if(respuesta.data.status === 200){
      Swal.fire({
        icon:'success',
        title: "Articulo agregado a favoritos",
        showConfirmButton: false,
        timer: 1500
      })

      setTimeout(() => {
        navigate(0)
      }, 1500);
    }
    else if(respuesta.data.status === 500){
      Swal.fire({
        icon: 'error',
        title: "No se puede agregar este producto a favoritos porque el token expiró o es inexistente",
        showConfirmButton: true,
      })
    }

  }

  return (
    <>
      <NavbarPagina />
      <div className="pagDetProducto">
        <section className="contenedorDetProd mx-2">
          <article className="artDetProducto">
            <img src={productoEspecifico.imagen1} alt="" className="imgProducto"/>
            <div className="detallesProducto">
              <span className="fs-1 d-block">{productoEspecifico.nombre}</span>
              <NavLink className={"text-decoration-none"} to={`/${productoEspecifico.categoria}`}>
                <span className="d-block fs-3 fst-italic mt-4 categoriaProducto">{productoEspecifico.categoria}</span>
              </NavLink>
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
                  productoEspecifico.stock === 0 || !usuarioLogueado || usuario.estado === "Pendiente"?
                  <button className="btn btn-success me-2" disabled>Agregar al carrito</button>
                  :
                  hayCarrito ?
                  <button className="btn btn-outline-success me-2" disabled>Producto agregado al Carrito</button>
                  :
                  <button className="btn btn-success me-2" onClick={() => agregarCarrito(productoEspecifico)}>Agregar al Carrito</button>
                }
                {
                  !usuarioLogueado ?
                  <button type="button" className="btn btn-warning" disabled>Agregar a Favoritos</button>
                  :
                  hayFavoritos ? 
                  <button className="btn btn-outline-warning me-2" disabled>Producto agregado a Favoritos</button>
                  :
                  <button type="button" className="btn btn-warning" onClick={() => agregarFavoritos(productoEspecifico)}>Agregar a Favoritos</button>
                }
              </div>
            </div>
          </article>
        </section>
        <section className="seccionComentarios mb-4">
          <h3 className="mx-4 tituloComentario">Comentarios</h3>
          <CajaComentario usuario = {usuario.username} producto = {productoEspecifico.nombre}/>
          {
            hayComentarios ? 
            comentarioProductoEspecifico.map((comentario) => (
              <CardComentario key={comentario._id} id = {comentario._id} usuario = {comentario.usuario} msj = {comentario.mensaje} fecha = {comentario.fecha}/>
            ))
            :
            <div className="d-flex justify-content-center mt-3">
              <p className={usuarioLogueado ? "fs-3" : "d-none invisible"}>Todavia no hay comentarios. ¡Se el primero en comentar!</p>
            </div>
          }
        </section>
        <Footer />
      </div>
    </>
  )
}