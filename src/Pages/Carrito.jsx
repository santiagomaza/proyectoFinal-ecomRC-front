import { NavbarPagina } from "../Components/NavbarPagina"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import '../styles/carrito.css'
import { Footer } from '../Components/Footer'
import Swal from 'sweetalert2'

export const Carrito = () => {
  const [carrito, setCarrito] = useState([])
  const [usuarioEspecifico, setUsuarioEspecifico] = useState({})
  const [hayCarrito, setHayCarrito] = useState(null)
  const navigate = useNavigate()
  const [total, setTotal] = useState(0)

  const idUsuario = localStorage.getItem('idUsuario')
  const token = localStorage.getItem('token')

  useEffect(() => {
    const obtenercarrito = async () => {
      const respuesta = await axios.get("http://localhost:8000/carritos/obtener-carrito")
      setCarrito(respuesta.data)
    }

    obtenercarrito()
  }, [])

  useEffect(() => {
    if(idUsuario){
      const obtenerUsuarioEspecifico = async () => {
        const respuesta = await axios.get(`http://localhost:8000/usuarios/${idUsuario}`)
        setUsuarioEspecifico(respuesta.data.usuario)
      }
  
      obtenerUsuarioEspecifico()
    }
  }, [idUsuario])

  useEffect(() => {
    if(!idUsuario){
      navigate("/")
    }
    
    if(idUsuario && usuarioEspecifico.estado === "Pendiente"){
      navigate("/")
    }
  }, [idUsuario, usuarioEspecifico.estado, navigate])

  const carritoUsuario = carrito.filter((cart) => cart.usuario === usuarioEspecifico.username)

  useEffect(() => {
    if(carritoUsuario.length > 0){
      setHayCarrito(true)
    }

    let total = 0

    for (let i = 0; i < carritoUsuario.length; i++) {
      total += carritoUsuario[i].producto.precio
    }

    setTotal(total)

  }, [carritoUsuario, carrito])

  const eliminarProdCarrito = async (id) => {
    const respuesta = await axios.delete("http://localhost:8000/carritos/borrar-carrito", {
      data: {
        id: id,
        accessToken: token
      }
    })

    if(respuesta.data.status === 200){
      Swal.fire({
        icon: "success",
        title: "Producto eliminado del carrito",
        showConfirmButton: false,
        timer: 1500
      })

      setTimeout(() => {
        navigate(0)
      }, 1500);
    }
    else if(respuesta.data.status === 500){
      Swal.fire({
        icon: "error",
        title: "No se puede eliminar este articulo del carrito porque el token expiró o es inexistente",
        showConfirmButton: true,
      })
    }
  }

  return (
    <>
      <NavbarPagina />
      <div className="pagCarrito">
        <h2 className="text-center mt-2">Tu carrito de compras</h2>
        {
          hayCarrito ?
          carritoUsuario.map((carrito) => (
            <div className="card mb-4 mx-3" key={carrito._id}>
              <div className="card-body">
                <img src={carrito.producto.imagen1} alt="" style={{height: "200px", width: "200px"}}/>
                <article className='d-inline-block detallesProdCarrito'>
                  <h5 className="card-title nombreProdCarrito">{carrito.producto.nombre}</h5>
                  {
                    carrito.producto.precio === 0?
                    <p className="card-text fw-bold text-danger precioCarrito">Gratis</p>
                    :
                    <p className="card-text fw-bold text-danger precioCarrito">${carrito.producto.precio}</p>
                  }
                  <span className="stockCarrito">Stock: {carrito.producto.stock}</span>
                </article>
                <div className='d-flex justify-content-center'>
                  <button className='btn btn-danger' onClick={() => eliminarProdCarrito(carrito._id)}>Eliminar del Carrito</button>
                </div>
              </div>
            </div>
          ))
          :
          <>
            <div className="d-flex justify-content-center mt-2 mx-3">
              <i className="bi bi-cart carritoVacio text-warning"></i>
            </div>
            <h3 className="text-center">Tu carrito de compras esta vacío</h3>
            <h4 className="text-center mt-3">¡Explora los distintos productos que ofrecemos en eComRC y haz tu primera compra!</h4>
          </>
        }
        <h3 className={hayCarrito ? "d-block text-center" : "d-none"}>TOTAL: ${total}</h3>
        <div className={hayCarrito ? "d-flex justify-content-center mt-4" : "d-none"}>
          <button className="btn btnComprar fw-bold mb-3" onClick={() => navigate("/*")}>Finalizar Compra</button>
        </div>
      </div>
      <Footer />
    </>
  )
}
