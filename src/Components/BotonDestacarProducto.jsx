import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'

export const BotonDestacarProducto = ({idProducto, nombre}) => {
  const [productos, setProductos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:8000/productos/obtener-productos")
    .then(response => {
      setProductos(response.data)
    })
  }, [])

  const productosDestacados = productos.filter((producto) => producto.destacado === true)

  const destacarProducto = () => {
    if(productosDestacados.length === 1){
      Swal.fire({
        icon: 'error',
        title: 'No se puede destacar más de un producto',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else{
      Swal.fire({
        title: `¿Estás seguro de que quieres destacar a ${nombre}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, destacar!",
        cancelButtonText: "Cancelar"
      }).then(async (result) => {
        if(result.isConfirmed){
          const respuesta = await axios.patch("http://localhost:8000/productos/destacar-producto", {
            id: idProducto,
            destacado: true
          })
  
          if(respuesta.data.status === 200){
            Swal.fire({
              icon: "success",
              title: `Producto ${nombre} destacado correctamente`,
              showConfirmButton: false,
              timer: 1500
            })
  
            setTimeout(() => {
              navigate(0)
            }, 1500);
          }
        }
      })
    }
  }

  return (
    <button type="button" className="btn btn-transparent" onClick={destacarProducto}>
      <i className="bi bi-star fs-2"></i>
    </button>
  )
}
