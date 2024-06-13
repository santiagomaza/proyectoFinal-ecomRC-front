import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export const BotonQuitarDestacado = ({idProducto, nombre}) => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')
  const URL_BACK = import.meta.env.VITE_URL_BACKEND

  const quitarDestacado = () => {
    Swal.fire({
      title: `¿Estás seguro de que quieres dejar sin destacar a ${nombre}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quitar destacado!",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if(result.isConfirmed){
        const respuesta = await axios.patch(`${URL_BACK}/productos/destacar-producto`, {
          id: idProducto,
          destacado: false,
          accessToken: token
        })

        if(respuesta.data.status === 200){
          Swal.fire({
            icon:'success',
            title: `Producto ${nombre} sin destacar correctamente`,
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
            title: "No se puede realizar esta acción porque el token expiró o es inexistente",
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    })
  }
  
  return (
    <button type="button" className="btn btn-transparent" onClick={quitarDestacado}>
      <i className="bi bi-star-fill fs-2 text-warning"></i>
    </button>
  )
}
