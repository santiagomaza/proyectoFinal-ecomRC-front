import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { NavbarPagina } from "../Components/NavbarPagina"
import { Footer } from '../Components/Footer'
import axios from 'axios'
import Swal from 'sweetalert2'
import '../styles/carrito.css'

export const Carrito = () => {
  const [carrito, setCarrito] = useState([])
  const [usuarioEspecifico, setUsuarioEspecifico] = useState({})
  const [hayCarrito, setHayCarrito] = useState(null)
  const [hayTotal, setHayTotal] = useState(null)
  const [total, setTotal] = useState(0)
  const [productos, setProductos] = useState([])
  const navigate = useNavigate()
  const URL_BACK = import.meta.env.VITE_URL_BACKEND

  const idUsuario = sessionStorage.getItem('idUsuario')
  const token = sessionStorage.getItem('token')

  const obtenercarrito = async () => {
    const respuesta = await axios.get(`${URL_BACK}/carritos/obtener-carrito`)
    setCarrito(respuesta.data.carrito)
    setTotal(respuesta.data.total)
  }

  useEffect(() => {
    obtenercarrito()
  }, [])

  useEffect(() => {
    if(idUsuario){
      const obtenerUsuarioEspecifico = async () => {
        const respuesta = await axios.get(`${URL_BACK}/usuarios/${idUsuario}`)
        setUsuarioEspecifico(respuesta.data.usuario)
      }
  
      obtenerUsuarioEspecifico()
    }
  }, [idUsuario])

  useEffect(() => {
    const obtenerProductos = async () => {
      const respuesta = await axios.get("http://localhost:8000/productos/obtener-productos")
      setProductos(respuesta.data.producto)
    }
    obtenerProductos()
  }, [])

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
    if(carritoUsuario.length > 0 && total){
      setHayCarrito(true)
      setHayTotal(true)
    }
  }, [carritoUsuario, carrito])

  const eliminarProdCarrito = async (id) => {
    const respuesta = await axios.delete(`${URL_BACK}/carritos/borrar-carrito`, {
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

  const calcularTotal = () => {
    let precioTotal = 0
    carrito.forEach((item) => {
      precioTotal += item.producto.precio * item.cantidad
    })
    setTotal(precioTotal)
  }

  const aumentarCantidad = (id) => {
    const actualizarCarrito = carrito.map((item) => {
      if(item.producto._id === id){
        const producto = productos.find((prod) => prod._id === id)

        if(producto && producto.stock > 0){
          (async()=> {
            axios.patch(`${URL_BACK}/carritos/modificar-cantidad`, {
              id: item._id,
              precio: item.producto.precio, 
              cantidad: item.cantidad + 1
            })
          })()

          return {...item, cantidad: item.cantidad + 1}
        }
      }
      return item
    })
    
    setCarrito(actualizarCarrito)
    calcularTotal()
  }

  const disminuirCantidad = (id) => {
    const actualizarCarrito = carrito.map((item) => {
      if(item.producto._id === id){
        if(item.cantidad > 1){
          (async()=>{
            await axios.patch(`${URL_BACK}/carritos/modificar-cantidad`, {
              id: item._id,
              precio: item.producto.precio,
              cantidad: item.cantidad - 1
            }) 
          })()
          return {...item, cantidad: item.cantidad - 1}
        }
      }
      
      return item
    })
    setCarrito(actualizarCarrito)
    calcularTotal()
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
              <div className="card-body cardCarrito">
                <img src={carrito.producto?.imagen1} alt="" style={{height: "200px", width: "200px"}}/>
                <article className='d-inline-block detallesProdCarrito'>
                  <h5 className="card-title nombreProdCarrito">{carrito.producto?.nombre}</h5>
                  {
                    carrito.producto.precio === 0?
                    <p className="card-text fw-bold text-danger precioCarrito">Gratis</p>
                    :
                    <p className="card-text fw-bold text-danger precioCarrito">${carrito.producto?.precio}</p>
                  }
                  <span className="stockCarrito">Stock: {carrito.producto?.stock}</span>
                  <span className="titCantidad d-block">Cantidad:</span>
                  <div className="botonesCantidades d-flex mt-2">
                    <button className="btn btn-outline-dark me-2" onClick={()=> aumentarCantidad(carrito.producto._id)}>+</button>
                    <input type="number" className="form-control mt-3" min="1" max={carrito.producto?.stock} value={carrito?.cantidad} id="cantidades" readOnly/>
                    {
                      carrito.cantidad === 1 ?
                      <button className="btn btn-outline-dark ms-2 disabled" disabled>-</button>
                      :
                      <button className="btn btn-outline-dark ms-2" onClick={()=> disminuirCantidad(carrito.producto._id)}>-</button>
                    }
                  </div>
                </article>
              </div>
                  <div className="d-flex justify-content-center">
                    <button className='btn btn-transparent text-primary' onClick={() => eliminarProdCarrito(carrito._id)}>Eliminar del Carrito</button>
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
        <h3 className={hayTotal ? "d-block text-center text-success fw-bold" : "d-none"}>TOTAL: ${total}</h3>
        <div className={hayCarrito ? "d-flex justify-content-center mt-4" : "d-none"}>
          <button className="btn btnComprar fw-bold mb-3" onClick={() => navigate("/*")}>Finalizar Compra</button>
        </div>
      </div>
      <Footer />
    </>
  )
}
