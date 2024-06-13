import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export const BotonEliminarProducto = ({idProducto, nombre}) => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem("token")
  const URL_BACK = import.meta.env.VITE_URL_BACKEND

  const borrarProducto = () => {
    Swal.fire({
      title: `¿Estás seguro de que quieres eliminar a ${nombre}?`,
      text: "No se puede revertir el proceso en caso de eliminar el producto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#808B96",
      confirmButtonText: "Si, borrar!"
    }).then(async (result) => {
      if(result.isConfirmed){
        const respuesta = await axios.delete(`${URL_BACK}/productos/eliminar-producto`, {
          data: {
            id: idProducto,
            accessToken: token
          }
        })

        if(respuesta.data.status === 200){
          Swal.fire({
            icon: "success",
            title: respuesta.data.message,
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

  return (
    <button className="btn btn-danger btn-sm" onClick={() => borrarProducto(idProducto, nombre)}>
      <i className="bi bi-trash2-fill"></i>
    </button>
  )
}
